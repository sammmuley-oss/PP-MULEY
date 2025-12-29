import { StorageKeys, Service, Project, Lead } from "../types";
import { INITIAL_SERVICES, INITIAL_PROJECTS } from "../constants";

import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc 
} from "firebase/firestore";

import { firestore } from "./firebase";

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

  private initialize() {
    if (!localStorage.getItem(StorageKeys.SERVICES)) {
      localStorage.setItem(StorageKeys.SERVICES, JSON.stringify(INITIAL_SERVICES));
    }

    if (!localStorage.getItem(StorageKeys.PROJECTS)) {
      localStorage.setItem(StorageKeys.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
    }
  }

  private get<T>(key: StorageKeys): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private save<T>(key: StorageKeys, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // SERVICES
  public getServices(): Service[] {
    return this.get<Service>(StorageKeys.SERVICES);
  }

  public deleteService(id: string) {
    this.save(
      StorageKeys.SERVICES,
      this.getServices().filter(s => s.id !== id)
    );
  }

  // PROJECTS
  public getProjects(): Project[] {
    return this.get<Project>(StorageKeys.PROJECTS);
  }

  public deleteProject(id: string) {
    this.save(
      StorageKeys.PROJECTS,
      this.getProjects().filter(p => p.id !== id)
    );
  }

  // LEADS (FIREBASE)
  public async getLeads(): Promise<Lead[]> {
    const snapshot = await getDocs(collection(firestore, "leads"));
    return snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Lead) }));
  }

  public async addLead(lead: Lead) {
    await addDoc(collection(firestore, "leads"), lead);
  }

  public async updateLeadStatus(id: string, status: Lead["status"]) {
    await updateDoc(doc(firestore, "leads", id), { status });
  }

  // NEW: DELETE ONE LEAD
  public async deleteLead(id: string) {
    await deleteDoc(doc(firestore, "leads", id));
  }

  // OPTIONAL: DELETE ALL LEADS (if you want later)
  public async deleteAllLeads() {
    const snapshot = await getDocs(collection(firestore, "leads"));
    const deletions = snapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletions);
  }
}

export const storage = StorageService.getInstance();
