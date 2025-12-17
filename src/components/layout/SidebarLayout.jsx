import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutGrid, PlaySquare, Plus, User } from 'lucide-react';
import '../../styles/SidebarLayout.css';

export default function SidebarLayout() {
    return (
        <div className="sidebar-layout">
            {/* Left Sidebar (Desktop/Tablet) */}
            <aside className="sidebar-pane">
                <div className="brand-header">
                    <h1 className="brand-name">SASART</h1>
                    <div className="brand-sub">Digital Story Studio</div>
                </div>

                <div className="nav-section-title">Studio</div>
                <nav className="nav-list">
                    <NavLink to="/" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
                        <LayoutGrid size={16} /> Home
                    </NavLink>
                    <NavLink to="/create" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
                        <Plus size={16} /> New Story
                    </NavLink>
                    <NavLink to="/library" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
                        <PlaySquare size={16} /> Library
                    </NavLink>
                </nav>

                <div className="nav-section-title" style={{ marginTop: 'auto' }}>Account</div>
                <nav className="nav-list">
                    <NavLink to="/profile" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
                        <User size={16} /> Settings
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-stage">
                <Outlet />

                {/* Mobile Navigation (Visible only on small screens) */}
                <nav className="mobile-nav" style={{ display: 'none' }}>
                    {/* To be implemented if we detect mobile, but CSS handles visibility */}
                    <NavLink to="/"><LayoutGrid /></NavLink>
                    <NavLink to="/create"><Plus /></NavLink>
                    <NavLink to="/library"><PlaySquare /></NavLink>
                </nav>
            </main>
        </div>
    );
}
