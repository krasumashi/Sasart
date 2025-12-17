import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, PlaySquare, Plus, User } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
    return (
        <nav className="mobile-pencil-case">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
                <LayoutGrid size={24} strokeWidth={1.5} />
                <span>Studio</span>
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => `mobile-create-fab ${isActive ? 'active' : ''}`}>
                <Plus size={32} strokeWidth={2} />
            </NavLink>

            <NavLink to="/library" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
                <PlaySquare size={24} strokeWidth={1.5} />
                <span>Library</span>
            </NavLink>
        </nav>
    );
}
