
import React from 'react';
import { 
  Truck, 
  Settings, 
  Construction, 
  Container, 
  Zap, 
  Building2, 
  Users, 
  Anchor 
} from 'lucide-react';
import { Service, Project } from './types';

export const CONTACT_DETAILS = {
  companyName: "PANDHARINATH P. MULEY",
  tradeName: "P. P. MULEY & CO.",
  owner: "Pro. Amol Muley",
  mobile: ["9527337752", "9890278043", "8308525252"],
  emails: ["ppmuley_52@rediffmail.com", "ppmuley52@gmail.com"],
  website: "www.ppmuley.com",
  whatsapp: "919527337752",
  address: "Bhagyashri Apts., Flat No. C-4, Sambhaji Nagar, Alandi Road, Bhosari, Pune-39."
};

export const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Handling of Heavy Equipment', description: 'Expert maneuvering and positioning of industrial-grade heavy equipment with precision.', icon: 'Truck' },
  { id: '2', title: 'Machinery Loading & Unloading', description: 'Safe and efficient loading and unloading services using specialized lifting tools.', icon: 'Container' },
  { id: '3', title: 'Commissioning Services', description: 'End-to-end machinery setup and initial operational testing for industrial units.', icon: 'Settings' },
  { id: '4', title: 'Structural Fabrication', description: 'High-quality steel fabrication and erection for industrial sheds and structures.', icon: 'Construction' },
  { id: '5', title: 'Boiler Tank Handling', description: 'Specialized movement and installation of industrial boilers and heavy tanks.', icon: 'Anchor' },
  { id: '6', title: 'Transformer Handling', description: 'Delicate and secure handling of power transformers and electrical infrastructure.', icon: 'Zap' },
  { id: '7', title: 'Steel Erection', description: 'Precision placement and fixing of structural steel components in construction.', icon: 'Building2' },
  { id: '8', title: 'Labor Supply Services', description: 'Providing skilled and semi-skilled industrial labor for various project needs.', icon: 'Users' }
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'p1', title: 'Industrial Plant Relocation', category: 'Heavy Handling', imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800', date: '2023-10-15' },
  { id: 'p2', title: 'Steel Structure Erection', category: 'Fabrication', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', date: '2023-11-20' },
  { id: 'p3', title: 'Transformer Installation', category: 'Power', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800', date: '2024-01-05' },
  { id: 'p4', title: 'Crane Operations Onsite', category: 'Machinery', imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', date: '2024-02-12' }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Truck': return <Truck className="w-8 h-8" />;
    case 'Container': return <Container className="w-8 h-8" />;
    case 'Settings': return <Settings className="w-8 h-8" />;
    case 'Construction': return <Construction className="w-8 h-8" />;
    case 'Anchor': return <Anchor className="w-8 h-8" />;
    case 'Zap': return <Zap className="w-8 h-8" />;
    case 'Building2': return <Building2 className="w-8 h-8" />;
    case 'Users': return <Users className="w-8 h-8" />;
    default: return <Truck className="w-8 h-8" />;
  }
};
