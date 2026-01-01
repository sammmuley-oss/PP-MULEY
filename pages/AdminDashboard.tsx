import React, { useState, useEffect } from "react";
import { storage } from "../services/storage";
import { Lead, Service, Project, Invoice } from "../types";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

import {
  Users,
  Settings,
  Image as ImageIcon,
  LogOut,
  FileText,
  Upload,
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<"leads" | "services" | "projects" | "invoices">("leads");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [uploadingInvoice, setUploadingInvoice] = useState(false);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [invoiceForm, setInvoiceForm] = useState({
    company: "",
    invoiceNumber: "",
    amount: "",
    status: "pending" as Invoice["status"],
    notes: "",
    file: null as File | null,
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchedLeads = await storage.getLeads();
    const fetchedInvoices = await storage.getInvoices();

    setLeads(fetchedLeads);
    setInvoices(fetchedInvoices);
    setServices(storage.getServices());
    setProjects(storage.getProjects());
  };

  /* ---------- LEADS ---------- */
  const handleUpdateLead = async (id: string, status: Lead["status"]) => {
    await storage.updateLeadStatus(id, status);
    refreshData();
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Delete enquiry permanently?")) return;
    await storage.deleteLead(id);
    refreshData();
  };

  /* ---------- SERVICES ---------- */
  const saveService = () => {
    if (!editingService) return;
    storage.saveService(editingService);
    setEditingService(null);
    refreshData();
  };

  const handleDeleteService = (id: string) => {
    if (!confirm("Delete service?")) return;
    storage.deleteService(id);
    refreshData();
  };

  /* ---------- PROJECTS ---------- */
  const saveProject = () => {
    if (!editingProject) return;
    storage.saveProject(editingProject);
    setEditingProject(null);
    refreshData();
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm("Delete project?")) return;
    storage.deleteProject(id);
    refreshData();
  };

  /* ---------- INVOICES (FIXED) ---------- */
  const saveInvoice = async () => {
    if (
      !invoiceForm.company ||
      !invoiceForm.invoiceNumber ||
      !invoiceForm.file
    ) {
      alert("Please complete all invoice fields and upload PDF");
      return;
    }

    try {
      setUploadingInvoice(true);
      console.log("Uploading invoice...");

      await storage.addInvoice(
  {
    company: invoiceForm.company,
    invoiceNumber: invoiceForm.invoiceNumber,
    amount: Number(invoiceForm.amount),
    status: invoiceForm.status,
    notes: invoiceForm.notes || "",
  },
  invoiceForm.file!   // ✅ FIXED (file + non-null assertion)
);


      alert("✅ Invoice uploaded successfully");

      setInvoiceForm({
        company: "",
        invoiceNumber: "",
        amount: "",
        status: "pending",
        notes: "",
        file: null,
      });

      refreshData();
    } catch (error) {
      console.error("❌ Invoice upload failed:", error);
      alert("Invoice upload failed. Check console for details.");
    } finally {
      setUploadingInvoice(false);
    }
  };

  const updateInvoiceStatus = async (id: string, status: Invoice["status"]) => {
    await storage.updateInvoiceStatus(id, status);
    refreshData();
  };

  const deleteInvoice = async (invoice: Invoice) => {
    if (!confirm("Delete invoice permanently?")) return;
    await storage.deleteInvoice(invoice.id, invoice.pdfUrl);
    refreshData();
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/#/login";
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your website</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-xl flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>

          <div className="flex bg-slate-100 p-1.5 rounded-xl">
            {[
              ["leads", <Users size={18} />],
              ["services", <Settings size={18} />],
              ["projects", <ImageIcon size={18} />],
              ["invoices", <FileText size={18} />],
            ].map(([key, icon]) => (
              <button
                key={key as string}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-2.5 rounded-lg ${
                  activeTab === key
                    ? "bg-white text-sky-600"
                    : "text-slate-600"
                }`}
              >
                {icon} {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "invoices" && (
        <InvoicesTab
          invoices={invoices}
          invoiceForm={invoiceForm}
          setInvoiceForm={setInvoiceForm}
          saveInvoice={saveInvoice}
          uploadingInvoice={uploadingInvoice}
          updateInvoiceStatus={updateInvoiceStatus}
          deleteInvoice={deleteInvoice}
        />
      )}
    </div>
  );
};

/* ---------- INVOICES TAB ---------- */

const InvoicesTab = ({
  invoices,
  invoiceForm,
  setInvoiceForm,
  saveInvoice,
  uploadingInvoice,
  updateInvoiceStatus,
  deleteInvoice,
}) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold flex gap-2">
      <FileText /> Invoice Records ({invoices.length})
    </h2>

    <div className="p-6 border rounded-xl bg-slate-50 grid md:grid-cols-2 gap-4">
      <input
        className="border p-2 rounded"
        placeholder="Company Name"
        value={invoiceForm.company}
        onChange={(e) =>
          setInvoiceForm({ ...invoiceForm, company: e.target.value })
        }
      />

      <input
        className="border p-2 rounded"
        placeholder="Invoice Number"
        value={invoiceForm.invoiceNumber}
        onChange={(e) =>
          setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })
        }
      />

      <input
        className="border p-2 rounded"
        placeholder="Amount"
        type="number"
        value={invoiceForm.amount}
        onChange={(e) =>
          setInvoiceForm({ ...invoiceForm, amount: e.target.value })
        }
      />

      <select
        className="border p-2 rounded"
        value={invoiceForm.status}
        onChange={(e) =>
          setInvoiceForm({
            ...invoiceForm,
            status: e.target.value as Invoice["status"],
          })
        }
      >
        <option value="pending">Pending</option>
        <option value="partial">Partially Paid</option>
        <option value="paid">Paid</option>
      </select>

      <textarea
        className="border p-2 rounded col-span-2"
        placeholder="Notes"
        value={invoiceForm.notes}
        onChange={(e) =>
          setInvoiceForm({ ...invoiceForm, notes: e.target.value })
        }
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) =>
          setInvoiceForm({
            ...invoiceForm,
            file: e.target.files?.[0] || null,
          })
        }
      />

      <button
        disabled={uploadingInvoice}
        onClick={saveInvoice}
        className="px-6 py-3 bg-sky-600 text-white rounded-xl flex gap-2 disabled:opacity-50"
      >
        <Upload />
        {uploadingInvoice ? "Uploading..." : "Upload Invoice"}
      </button>
    </div>
  </div>
);
