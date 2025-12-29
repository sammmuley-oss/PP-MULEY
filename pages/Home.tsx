
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2,
  HardHat,
  // Fix: Added missing Phone import
  Phone
} from 'lucide-react';
import { CONTACT_DETAILS, INITIAL_SERVICES } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-600/10 backdrop-blur-3xl rounded-full blur-[120px] -mr-40 mt-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <span className="h-[2px] w-12 bg-sky-400"></span>
              <span className="text-sky-400 font-bold uppercase tracking-[0.3em] text-sm">Elite Industrial Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] animate-slide-up">
              Moving Your World with <span className="text-sky-400">Precision</span> & Power
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl animate-fade-in delay-200">
              P. P. MULEY & CO. provides specialized heavy machinery handling, installation, and fabrication services across India. Safety driven, expertly executed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-500">
              <Link to="/contact" className="px-10 py-5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-900/20">
                Request a Quote <ArrowRight size={20} />
              </Link>
              <Link
  to="/services"
  className="px-10 py-5 bg-black text-white font-bold rounded-lg text-lg text-center shadow hover:bg-gray-900 transition-all"
>
  Explore Services
</Link>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] h-32 text-slate-50">
           <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-full">
               <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
           </svg>
        </div>
      </section>

      {/* Stats / Intro */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10 group">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800" 
                  alt="Industrial Work" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 bg-white p-8 rounded-2xl shadow-2xl z-20 border-l-8 border-sky-600 hidden md:block">
                <div className="text-4xl font-bold text-sky-900 mb-2">20+</div>
                <div className="text-slate-600 font-semibold uppercase tracking-wider text-xs">Years of Excellence</div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-200/50 rounded-full blur-3xl -z-10"></div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Trusted Partner in Heavy Machinery Handling
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At <span className="text-sky-600 font-bold">P. P. MULEY & CO.</span>, we understand that handling high-value industrial assets requires more than just muscle; it requires engineering precision, rigorous safety standards, and experienced hands. 
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck className="text-sky-600" />, title: "Safety First Protocol", desc: "Rigorous onsite safety measures protecting your assets and our team." },
                  { icon: <Clock className="text-sky-600" />, title: "Timely Execution", desc: "Minimal downtime through efficient planning and execution." },
                  { icon: <TrendingUp className="text-sky-600" />, title: "Custom Solutions", desc: "Bespoke handling strategies tailored to your specific industrial needs." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 industrial-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sky-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900">Comprehensive Industrial Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INITIAL_SERVICES.slice(0, 4).map((service) => (
              <Link 
                key={service.id} 
                to="/services" 
                className="group p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <HardHat size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">{service.description}</p>
                <div className="mt-auto text-sky-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 font-bold text-slate-800 border-b-2 border-sky-600 pb-1 hover:text-sky-600 transition-colors">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-24 bg-sky-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to Start Your Project?</h2>
          <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
            Contact us today for a detailed assessment and competitive quote for your heavy lifting or industrial needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact" className="px-12 py-5 bg-white text-sky-700 font-bold rounded-full text-lg shadow-2xl hover:bg-sky-50 transition-all transform hover:scale-105 active:scale-95">
              Contact Us Now
            </Link>
            <a href={`tel:${CONTACT_DETAILS.mobile[0]}`} className="px-12 py-5 bg-sky-800 text-white font-bold rounded-full text-lg shadow-2xl hover:bg-sky-900 transition-all flex items-center justify-center gap-3">
              <Phone size={20} /> Call Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
