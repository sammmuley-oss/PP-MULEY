import React, { useState, useEffect } from "react";
import { storage } from "../services/storage";
import { Lead, Service, Project, Invoice } from "../types";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

import {
  Users,
  Settings,
  Image as ImageIcon,
  Trash2,
  Plus,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  ExternalLink,
  LogOut,
  Pencil,
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

  /* ---------- INVOICES ---------- */
  const saveInvoice = async () => {
    if (!invoiceForm.company || !invoiceForm.invoiceNumber || !invoiceForm.file) {
      alert("Please complete all invoice fields and upload PDF");
      return;
    }

    await storage.addInvoice(
      {
        company: invoiceForm.company,
        invoiceNumber: invoiceForm.invoiceNumber,
        amount: Number(invoiceForm.amount),
        status: invoiceForm.status,
        notes: invoiceForm.notes || "",
      },
      invoiceForm.file
    );

    setInvoiceForm({
      company: "",
      invoiceNumber: "",
      amount: "",
      status: "pending",
      notes: "",
      file: null,
    });

    refreshData();
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
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-2.5 rounded-lg ${
                  activeTab === key ? "bg-white text-sky-600" : "text-slate-600"
                }`}
              >
                {icon} {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- INVOICES ---------- */}
      {activeTab === "invoices" && (
        <InvoicesTab
          invoices={invoices}
          invoiceForm={invoiceForm}
          setInvoiceForm={setInvoiceForm}
          saveInvoice={saveInvoice}
          updateInvoiceStatus={updateInvoiceStatus}
          deleteInvoice={deleteInvoice}
        />
      )}

      {/* ---------- LEADS ---------- */}
      {activeTab === "leads" && (
        <LeadsTab
          leads={leads}
          handleUpdateLead={handleUpdateLead}
          handleDeleteLead={handleDeleteLead}
        />
      )}

      {/* ---------- SERVICES ---------- */}
      {activeTab === "services" && (
        <ServicesTab
          services={services}
          editingService={editingService}
          setEditingService={setEditingService}
          saveService={saveService}
          handleDeleteService={handleDeleteService}
        />
      )}

      {/* ---------- PROJECTS ---------- */}
      {activeTab === "projects" && (
        <ProjectsTab
          projects={projects}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          saveProject={saveProject}
          handleDeleteProject={handleDeleteProject}
        />
      )}
    </div>
  );
};

/* ---------- SEPARATED TAB COMPONENTS ---------- */
/*  (same JSX you already had — just organized)  */

// Leads
const LeadsTab = ({ leads, handleUpdateLead, handleDeleteLead }) => (
  <div className="space-y-6">

    {leads.length === 0 && (
      <div className="text-center p-10 border rounded-xl">
        <p className="text-slate-500">No leads yet.</p>
      </div>
    )}

    {leads.map(lead => (
      <div key={lead.id} className="p-6 border rounded-xl flex justify-between">
        <div>
          <h3 className="font-bold">{lead.name}</h3>

          <p className="text-sm text-slate-500">{lead.email} | {lead.phone}</p>

          <p className="mt-2">{lead.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleUpdateLead(lead.id, "contacted")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Mark Handled
          </button>

          <button
            onClick={() => handleDeleteLead(lead.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

  </div>
);


// Services
const ServicesTab = ({
  services,
  editingService,
  setEditingService,
  saveService,
  handleDeleteService,
}) => (
  <>
    <div className="flex justify-between mb-4">
      <h2 className="text-xl font-bold">Services</h2>
      <button
        onClick={() =>
          setEditingService({
            id: crypto.randomUUID(),
            title: "",
            description: "",
            icon: "Tool",
          })
        }
        className="px-4 py-2 bg-sky-600 text-white rounded-lg"
      >
        + Add
      </button>
    </div>

    {services.map((s) => (
      <div key={s.id} className="p-4 border rounded-xl flex justify-between">
        <div>
          <strong>{s.title}</strong>
          <p>{s.description}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setEditingService(s)} className="px-3 py-2 bg-yellow-300 rounded-lg">
            Edit
          </button>
          <button onClick={() => handleDeleteService(s.id)} className="px-3 py-2 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    ))}

    {editingService && (
      <div className="p-4 border mt-4 rounded-xl">
        <input
          className="w-full border p-2 mb-2"
          value={editingService.title}
          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 mb-2"
          value={editingService.description}
          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
        />
        <button onClick={saveService} className="px-6 py-2 bg-sky-600 text-white rounded-lg">
          Save
        </button>
      </div>
    )}
  </>
);

// Projects
const ProjectsTab = ({
  projects,
  editingProject,
  setEditingProject,
  saveProject,
  handleDeleteProject,
}) => (
  <>
    <div className="flex justify-between mb-4">
      <h2 className="text-xl font-bold">Projects</h2>

      <button
        onClick={() =>
          setEditingProject({
            id: crypto.randomUUID(),
            title: "",
            imageUrl: "",
            category: "",
            date: "",
          })
        }
        className="px-4 py-2 bg-sky-600 text-white rounded-lg"
      >
        + Add
      </button>
    </div>

    {projects.map((p) => (
      <div key={p.id} className="p-4 border rounded-xl flex justify-between">
        <div>
          <strong>{p.title}</strong>
          <p>{p.category}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setEditingProject(p)} className="px-3 py-2 bg-yellow-300 rounded-lg">
            Edit
          </button>

          <button
            onClick={() => handleDeleteProject(p.id)}
            className="px-3 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    {editingProject && (
      <div className="p-4 border mt-4 rounded-xl">
        <input
          className="w-full border p-2 mb-2"
          value={editingProject.title}
          onChange={(e) =>
            setEditingProject({ ...editingProject, title: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-2"
          value={editingProject.imageUrl}
          onChange={(e) =>
            setEditingProject({ ...editingProject, imageUrl: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-2"
          value={editingProject.category}
          onChange={(e) =>
            setEditingProject({ ...editingProject, category: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-2"
          value={editingProject.date}
          onChange={(e) =>
            setEditingProject({ ...editingProject, date: e.target.value })
          }
        />

        <button onClick={saveProject} className="px-6 py-2 bg-sky-600 text-white rounded-lg">
          Save
        </button>
      </div>
    )}
  </>
);

// Invoices (already working)
const InvoicesTab = ({
  invoices,
  invoiceForm,
  setInvoiceForm,
  saveInvoice,
  updateInvoiceStatus,
  deleteInvoice
}) => (
  <div className="space-y-8">

    <h2 className="text-2xl font-bold flex gap-2">
      <FileText /> Invoice Records ({invoices.length})
    </h2>

    {/* Upload form */}
    <div className="p-6 border rounded-xl bg-slate-50 grid md:grid-cols-2 gap-4">

      <input
        className="border p-2 rounded"
        placeholder="Company Name"
        value={invoiceForm.company}
        onChange={e => setInvoiceForm({ ...invoiceForm, company: e.target.value })}
      />

      <input
        className="border p-2 rounded"
        placeholder="Invoice Number"
        value={invoiceForm.invoiceNumber}
        onChange={e => setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })}
      />

      <input
        className="border p-2 rounded"
        placeholder="Amount"
        type="number"
        value={invoiceForm.amount}
        onChange={e => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
      />

      <select
        className="border p-2 rounded"
        value={invoiceForm.status}
        onChange={e =>
          setInvoiceForm({ ...invoiceForm, status: e.target.value as any })
        }
      >
        <option value="pending">Pending</option>
        <option value="partial">Partially Paid</option>
        <option value="paid">Paid</option>
      </select>

      <textarea
        className="border p-2 rounded col-span-2"
        placeholder="Notes (optional)"
        value={invoiceForm.notes}
        onChange={e => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={e =>
          setInvoiceForm({ ...invoiceForm, file: e.target.files?.[0] || null })
        }
      />

      <button
        onClick={saveInvoice}
        className="px-6 py-3 bg-sky-600 text-white rounded-xl flex gap-2"
      >
        <Upload /> Upload Invoice
      </button>
    </div>

    {/* Invoice list */}
    <div className="space-y-3">

      {invoices.length === 0 && (
        <div className="text-center p-10 border rounded-xl">
          <p className="text-slate-500">No invoices added yet.</p>
        </div>
      )}

      {invoices.map(inv => (
        <div key={inv.id} className="p-6 border rounded-xl flex justify-between">

          <div>
            <h3 className="font-bold">{inv.company}</h3>

            <p className="text-sm">
              Invoice #{inv.invoiceNumber} — ₹{inv.amount}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-xs mt-2 inline-block ${
                inv.status === "paid"
                  ? "bg-green-200 text-green-800"
                  : inv.status === "partial"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {inv.status}
            </span>
          </div>

          <div className="flex gap-2">
            <a
              href={inv.pdfUrl}
              target="_blank"
              className="px-4 py-2 bg-slate-800 text-white rounded-lg"
            >
              View
            </a>

            <button
              onClick={() => updateInvoiceStatus(inv.id, "paid")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Mark Paid
            </button>

            <button
              onClick={() => deleteInvoice(inv)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
);

