import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { storage } from "../services/storage";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication demo
    if (username === "admin" && password === "ppmuley123") {
      localStorage.setItem("admin_logged_in", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-sky-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg transform rotate-3">
            <Lock size={40} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 mt-2">Access your website management tools</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />

              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />

              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-sky-600 text-white rounded-xl font-bold text-lg hover:bg-sky-700 shadow-xl active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Forgot password? Please contact site administrator.
        </div>

      </div>
    </div>
  );
};
