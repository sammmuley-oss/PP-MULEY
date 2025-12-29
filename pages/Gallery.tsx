import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { Project } from '../types';
import { Camera, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const data = storage.getProjects();          // <-- FIXED
    setProjects(data);

    const cats = ['All', ...Array.from(new Set(data.map(p => p.category)))];
    setCategories(cats);
  }, []);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter(p => p.category === filter);

  return (
    <div className="pt-10">
      <section className="bg-slate-900 py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Project Gallery
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Glimpses into our onsite operations, specialized crane handling, and
            structural triumphs across the region.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  filter === cat
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="bg-sky-600 self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-2 uppercase tracking-widest">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm">{project.date}</p>

                  <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <Camera size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">
                No projects added yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
