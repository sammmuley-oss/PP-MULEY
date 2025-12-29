import { StorageKeys, Service, Project, Lead } from "../types";
import { INITIAL_SERVICES, INITIAL_PROJECTS } from "../constants";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
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

  // 🔥 NEW — Delete Lead
  public async deleteLead(id: string) {
    await deleteDoc(doc(firestore, "leads", id));
  }
}

export const storage = StorageService.getInstance();
