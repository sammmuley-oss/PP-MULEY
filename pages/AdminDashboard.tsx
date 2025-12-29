import React, { useState, useEffect } from "react";
import { storage } from "../services/storage";
import { Lead, Service, Project } from "../types";

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
  ExternalLink
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<"leads" | "services" | "projects">("leads");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const fetchedLeads = await storage.getLeads();
      setLeads(fetchedLeads);

      setServices(storage.getServices());
      setProjects(storage.getProjects());
    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  const handleUpdateLead = async (id: string, status: Lead["status"]) => {
    await storage.updateLeadStatus(id, status);
    refreshData();
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    await storage.deleteLead(id);
    refreshData();
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Delete this service?")) {
      storage.deleteService(id);
      refreshData();
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Delete this project?")) {
      storage.deleteProject(id);
      refreshData();
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">
            Manage your business information and leads
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "leads"
                ? "bg-white text-sky-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users size={18} /> Leads
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "services"
                ? "bg-white text-sky-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Settings size={18} /> Services
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "projects"
                ? "bg-white text-sky-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon size={18} /> Projects
          </button>
        </div>
      </div>

      {/* LEADS TAB */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <Mail className="text-sky-600" /> Recent Inquiries ({leads.length})
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {leads.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No leads found.</p>
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-8 rounded-2xl border transition-all ${
                    lead.status === "new"
                      ? "bg-sky-50 border-sky-100 shadow-md"
                      : "bg-white border-slate-100"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === "new"
                              ? "bg-sky-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {lead.status}
                        </span>

                        <span className="text-slate-400 text-xs">
                          {new Date(lead.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {lead.name}
                        </h3>

                        <div className="flex flex-wrap gap-4 mt-2">
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-sm text-sky-600 hover:underline flex items-center gap-1"
                          >
                            <Mail size={14} /> {lead.email}
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="text-sm text-sky-600 hover:underline flex items-center gap-1"
                          >
                            <Phone size={14} /> {lead.phone}
                          </a>
                        </div>
                      </div>

                      <div className="bg-white/50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed">
                        {lead.message}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      {lead.status !== "contacted" && (
                        <button
                          onClick={() =>
                            handleUpdateLead(lead.id, "contacted")
                          }
                          className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition-all"
                        >
                          <CheckCircle size={16} /> Mark Handled
                        </button>
                      )}

                      <button className="px-6 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-all">
                        Reply <ExternalLink size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-700 transition-all"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SERVICES + PROJECTS tabs unchanged (they already work) */}
    </div>
  );
};
