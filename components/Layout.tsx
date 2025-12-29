import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { CONTACT_DETAILS } from "../constants";

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 We will implement real admin login later — for now keep disabled
  const isAdmin = false;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    alert("Admin login system not implemented yet.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Top Bar */}
      <div className="bg-sky-900 text-sky-50 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone size={14} /> {CONTACT_DETAILS.mobile[0]}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} /> {CONTACT_DETAILS.emails[0]}
            </span>
          </div>

          <div className="flex gap-4">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <LogOut size={14} /> Admin Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-white">
                Admin Access
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              PPM
            </div>
            <div>
              <h1 className="text-xl font-bold text-sky-900">
                P. P. MULEY & CO.
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-sky-600">
                Industrial Excellence
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === item.path
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-bold hover:bg-slate-900"
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/contact"
              className="px-6 py-2.5 bg-sky-600 text-white rounded-full text-sm font-bold hover:bg-sky-700"
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="py-4 text-lg border-b border-slate-200"
                >
                  {item.label}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="py-4 text-lg font-bold text-sky-600"
                >
                  Admin Dashboard
                </Link>
              )}

              <Link
                to="/contact"
                className="mt-4 bg-sky-600 text-white py-4 text-center rounded-lg font-bold"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-sky-600 rounded text-white flex items-center justify-center font-bold">
                PPM
              </div>
              <span className="text-xl text-white font-bold">
                P. P. MULEY & CO.
              </span>
            </div>

            <p className="text-sm mb-6">
              Specialists in heavy equipment handling, machinery installation,
              and structural fabrication.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link className="flex items-center gap-2 hover:text-sky-400" to={item.path}>
                    <ChevronRight size={14} /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="text-sky-500" /> {CONTACT_DETAILS.address}
              </li>
              <li className="flex gap-2">
                <Phone className="text-sky-500" /> {CONTACT_DETAILS.mobile.join(", ")}
              </li>
              <li className="flex gap-2">
                <Mail className="text-sky-500" /> {CONTACT_DETAILS.emails.join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <a
          href={`https://wa.me/${CONTACT_DETAILS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <MessageCircle size={28} />
        </a>
      </div>
    </div>
  );
};
