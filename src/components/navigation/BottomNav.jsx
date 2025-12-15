import { Home, Library, Plus, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Home size={24} />
                <span className="nav-label">Home</span>
            </NavLink>

            <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Library size={24} />
                <span className="nav-label">Lib</span>
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => `nav-item create-item ${isActive ? 'active' : ''}`}>
                <div className="create-fab">
                    <Plus size={28} color="#000" />
                </div>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <User size={24} />
                <span className="nav-label">Me</span>
            </NavLink>
        </nav>
    );
}
