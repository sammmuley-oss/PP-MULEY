import { StorageKeys, Service, Project, Lead, Invoice } from "../types";
import { INITIAL_SERVICES, INITIAL_PROJECTS } from "../constants";


import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { firestore } from "./firebase";
import { storage as fbStorage } from "./firebase";

export class StorageService {
  private static instance: StorageService;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // -----------------------------
  // INITIAL LOCAL DATA
  // -----------------------------
  private initialize() {
    if (!localStorage.getItem(StorageKeys.SERVICES)) {
      localStorage.setItem(
        StorageKeys.SERVICES,
        JSON.stringify(INITIAL_SERVICES)
      );
    }

    if (!localStorage.getItem(StorageKeys.PROJECTS)) {
      localStorage.setItem(
        StorageKeys.PROJECTS,
        JSON.stringify(INITIAL_PROJECTS)
      );
    }
  }

  private get<T>(key: StorageKeys): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private save<T>(key: StorageKeys, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // =============================
  // SERVICES (LOCAL)
  // =============================
  public getServices(): Service[] {
    return this.get<Service>(StorageKeys.SERVICES);
  }

  public saveService(service: Service) {
    const services = this.getServices();
    const exists = services.find((s) => s.id === service.id);

    this.save(
      StorageKeys.SERVICES,
      exists
        ? services.map((s) => (s.id === service.id ? service : s))
        : [...services, service]
    );
  }

  public deleteService(id: string) {
    this.save(
      StorageKeys.SERVICES,
      this.getServices().filter((s) => s.id !== id)
    );
  }

  // =============================
  // PROJECTS (LOCAL)
  // =============================
  public getProjects(): Project[] {
    return this.get<Project>(StorageKeys.PROJECTS);
  }

  public saveProject(project: Project) {
    const projects = this.getProjects();
    const exists = projects.find((p) => p.id === project.id);

    this.save(
      StorageKeys.PROJECTS,
      exists
        ? projects.map((p) => (p.id === project.id ? project : p))
        : [...projects, project]
    );
  }

  public deleteProject(id: string) {
    this.save(
      StorageKeys.PROJECTS,
      this.getProjects().filter((p) => p.id !== id)
    );
  }

  // =============================
  // LEADS (FIREBASE)
  // =============================
  public async getLeads(): Promise<Lead[]> {
    const snapshot = await getDocs(collection(firestore, "leads"));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Lead),
    }));
  }

  public async addLead(lead: Lead) {
    await addDoc(collection(firestore, "leads"), lead);
  }

  public async updateLeadStatus(id: string, status: Lead["status"]) {
    await updateDoc(doc(firestore, "leads", id), { status });
  }

  public async deleteLead(id: string) {
    await deleteDoc(doc(firestore, "leads", id));
  }

  // =============================
  // INVOICES (FIREBASE + STORAGE)
  // =============================

  public async getInvoices(): Promise<Invoice[]> {
    const snapshot = await getDocs(collection(firestore, "invoices"));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Invoice),
    }));
  }

  // upload PDF + save Firestore entry
  public async addInvoice(invoice: Omit<Invoice, "id" | "pdfUrl">, file: File) {
    const fileRef = ref(
      fbStorage,
      `invoices/${invoice.company}/${Date.now()}_${file.name}`
    );

    await uploadBytes(fileRef, file);
    const pdfUrl = await getDownloadURL(fileRef);

    await addDoc(collection(firestore, "invoices"), {
      ...invoice,
      pdfUrl,
      date: Date.now(),
    });
  }

  public async updateInvoiceStatus(id: string, status: Invoice["status"]) {
    await updateDoc(doc(firestore, "invoices", id), { status });
  }

  public async deleteInvoice(id: string, pdfUrl: string) {
    await deleteDoc(doc(firestore, "invoices", id));

    if (pdfUrl) {
      const fileRef = ref(fbStorage, pdfUrl);
      await deleteObject(fileRef);
    }
  }
}

export const storage = StorageService.getInstance();
