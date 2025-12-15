import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Layers, Plus, User, Disc } from 'lucide-react';
import '../../styles/StudioLayout.css';

export default function StudioLayout() {
    const location = useLocation();
    const isEditor = location.pathname.includes('/editor');

    // If in Editor mode, hide the Hub to give full screen space
    if (isEditor) return <Outlet />;

    return (
        <div className="studio-layout">
            <main className="studio-content" id="scroll-container">
                <Outlet />
            </main>

            {/* Floating Glass Hub */}
            <nav className="studio-hub-container fade-in">
                <div className="glass-pane studio-hub">

                    <HubLink to="/" icon={<Home size={20} />} label="Home" />
                    <HubLink to="/library" icon={<Layers size={20} />} label="Library" />

                    {/* Central Create Action */}
                    <NavLink to="/create" className="hub-main-action">
                        <Plus size={32} strokeWidth={2.5} />
                    </NavLink>

                    <HubLink to="/profile" icon={<User size={20} />} label="Profile" />

                </div>
            </nav>
        </div>
    );
}

function HubLink({ to, icon, label }) {
    return (
        <NavLink to={to} className={({ isActive }) => `hub-action ${isActive ? 'active' : ''}`}>
            {icon}
            {/* <span style={{fontSize: 10}}>{label}</span> */}
            {/* Minimalist: Icons only for V2 */}
        </NavLink>
    );
}
