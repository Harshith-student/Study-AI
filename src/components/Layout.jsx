import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiCheckSquare, FiCalendar, FiCpu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout-container">
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <h2 className="text-h2" style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Study AI</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/subjects" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <FiBook /> Subjects
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <FiCheckSquare /> Tasks
          </NavLink>
          <NavLink to="/revision" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <FiCalendar /> Revision
          </NavLink>
          <NavLink to="/ai-tools" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <FiCpu /> AI Assistant
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
