
import React from 'react';
import { 
  History, 
  Target, 
  Users, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { CONTACT_DETAILS } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="pt-10">
      {/* Breadcrumb / Hero */}
      <section className="bg-sky-900 py-24 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Our Company</h1>
          <p className="text-sky-300 max-w-2xl mx-auto text-lg">Over 20 years of expertise in industrial logistics and heavy machinery handling.</p>
        </div>
      </section>

      {/* Core History */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-block p-2 bg-sky-100 text-sky-700 rounded-lg font-bold text-sm mb-6 flex items-center gap-2">
                 <History size={18} /> Our Legacy
               </div>
               <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Founded on Trust, Driven by <span className="text-sky-600">Expertise</span></h2>
               <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                 <p>
                   P. P. MULEY & CO., led by Pro. Amol Muley, has established itself as a premier name in the industrial services sector in Pune and across Maharashtra. Our journey began with a simple mission: to provide safe and reliable handling for the machines that power our economy.
                 </p>
                 <p>
                   Today, we are more than just a handling company. We are partners in commissioning, structural fabrication, and labor solutions. Our client base spans from small manufacturing units to large-scale industrial plants.
                 </p>
               </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=400" alt="Worksite" className="rounded-xl shadow-lg mt-12" />
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400" alt="Steel Structure" className="rounded-xl shadow-lg" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-80 h-80 bg-sky-100 rounded-full blur-[80px]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all">
              <div className="w-14 h-14 bg-sky-600 text-white rounded-xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-600">To provide efficient, secure, and cost-effective industrial services through innovative handling techniques and specialized skills.</p>
            </div>
            <div className="p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all">
              <div className="w-14 h-14 bg-sky-600 text-white rounded-xl flex items-center justify-center mb-6">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-600">To be the most trusted and preferred industrial handling partner in India, known for zero-incident safety and exceptional service quality.</p>
            </div>
            <div className="p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all">
              <div className="w-14 h-14 bg-sky-600 text-white rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Core Values</h3>
              <p className="text-slate-600">Integrity, precision, commitment, and a relentless focus on client satisfaction guide every project we undertake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">Our Leadership</h2>
          <div className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-xl border border-slate-100 transform hover:scale-105 transition-transform">
             <div className="w-32 h-32 bg-sky-100 rounded-full mx-auto mb-8 flex items-center justify-center text-sky-600">
               <Briefcase size={64} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900">Pro. Amol Muley</h3>
             <p className="text-sky-600 font-semibold mb-4">Founder &amp; Proprietor</p>
             <p className="text-slate-600 italic">"Leading with precision and ensuring every piece of equipment is handled as if it were our own."</p>
          </div>
        </div>
      </section>
    </div>
  );
};
