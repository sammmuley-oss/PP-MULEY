import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import { CONTACT_DETAILS } from "../constants";
import { storage } from "../services/storage";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError("");

  try {
    await storage.addLead({
      id: crypto.randomUUID(),
      ...formData,
      timestamp: Date.now(),
      status: "new",
    });

    console.log("LEAD SAVED TO FIRESTORE");

    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  } catch (err) {
    console.error("FIRESTORE ERROR:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="pt-10">
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-sky-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                Contact Details
              </h2>

              <h1 className="text-5xl font-bold text-slate-900 mb-8">
                Get In Touch With Us
              </h1>

              <p className="text-lg text-slate-600 mb-12">
                Have questions about our handling services or need a quote for
                your next industrial relocation? Reach out to us directly or
                fill out the form.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-lg">
                      Call Us
                    </h4>

                    {CONTACT_DETAILS.mobile.map((m) => (
                      <p key={m} className="text-slate-600">
                        {m}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-lg">
                      Email Address
                    </h4>

                    {CONTACT_DETAILS.emails.map((e) => (
                      <p key={e} className="text-slate-600">
                        {e}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-lg">
                      Our Location
                    </h4>

                    <p className="text-slate-600 max-w-xs">
                      {CONTACT_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-lg">
                      Working Hours
                    </h4>

                    <p className="text-slate-600">
                      Mon - Sat: 09:00 AM - 07:00 PM
                    </p>

                    <p className="text-slate-600">
                      Sun: Emergency Services Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-3xl font-bold mb-8">Send Us a Message</h3>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    Request Sent!
                  </h4>

                  <p className="text-slate-600 mb-8">
                    We have received your message and will get back to you
                    within 24 hours.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sky-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Your Name
                      </label>

                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                        placeholder="Amol Muley"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Phone Number
                      </label>

                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address
                    </label>

                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      How can we help?
                    </label>

                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all resize-none"
                      placeholder="Describe your machinery or project requirements..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                      <AlertCircle size={18} /> {error}
                    </div>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-sky-600 text-white rounded-xl font-bold text-lg hover:bg-sky-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-sky-600/20 disabled:bg-sky-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Sending Request..."
                      : "Send Inquiry Now"}{" "}
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[500px] w-full bg-slate-200 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 text-white z-10 backdrop-blur-[2px]">
          <MapPin size={48} className="mb-4 text-sky-400" />

          <h3 className="text-3xl font-bold mb-2">Find Us in Bhosari</h3>

          <p className="max-w-md text-center px-4">
            Bhagyashri Apts., Flat No. C-4, Sambhaji Nagar, Alandi Road,
            Bhosari, Pune-39.
          </p>

          <a
            href="https://www.google.com/maps/search/Sambhaji+Nagar+Bhosari+Pune"
            target="_blank"
            rel="noreferrer"
            className="mt-6 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-sky-50 transition-all">
            Open in Google Maps
          </a>
        </div>

        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
      </section>
    </div>
  );
};
