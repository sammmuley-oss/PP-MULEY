import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

// Protected Route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem("admin_logged_in") === "true";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
