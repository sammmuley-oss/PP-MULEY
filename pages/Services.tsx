import React, { useEffect, useState } from "react";
import { storage } from "../services/storage";
import { Service } from "../types";
import { getIcon } from "../constants";
import { Hammer, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(storage.getServices());
  }, []);

  return (
    <div className="pt-10">
      <section className="bg-sky-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Our Services
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            We offer a wide array of specialized industrial services designed to
            meet the rigorous demands of modern manufacturing and infrastructure
            projects.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="group flex flex-col md:flex-row gap-8 p-10 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:border-sky-200 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 transform group-hover:rotate-6 transition-transform">
                  {getIcon(service.icon)}
                </div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <span className="text-slate-300 font-black text-4xl opacity-20 select-none">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8 text-sm font-medium text-slate-500">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Expert Handling & Care
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Safety Compliance Checked
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Specialized Equipment Used
                    </li>
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all"
                  >
                    Inquire for Details <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Banner */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl -ml-32 -mb-32" />

          <Hammer size={60} className="text-sky-400 mb-8" />

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Custom Fabrication & Erection Needs?
          </h2>

          <p className="text-slate-400 max-w-2xl mb-12 text-lg">
            Beyond standard handling, we provide turn-key fabrication solutions
            for steel structures, industrial sheds, and more.
          </p>

          <Link
            to="/contact"
            className="px-10 py-5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 transition-all shadow-xl shadow-sky-600/30"
          >
            Discuss Your Requirements
          </Link>
        </div>
      </section>
    </div>
  );
};
