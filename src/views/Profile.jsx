import React from 'react';
import { User, ChevronRight, Hash, Shield, Smartphone } from 'lucide-react';
import '../styles/Profile.css';

export default function Profile() {
    return (
        <div className="view-container profile-view">
            <div className="profile-header fade-in">
                <div className="avatar-large">
                    <User size={48} />
                </div>
                <h2 className="profile-name">Nai</h2>
                <span className="profile-handle">@nai_dopamine</span>

                <div className="stats-row">
                    <StatItem value="12" label="Sasarts" />
                    <StatItem value="3" label="Menus" />
                    <StatItem value="142" label="Clips" />
                </div>
            </div>

            <div className="settings-list fade-in" style={{ animationDelay: '0.1s' }}>

                <div className="settings-section">
                    <div className="settings-header">Credits & Ethics</div>
                    <SettingItem
                        icon={<Hash size={18} />}
                        label="Auto-Credit Creator"
                        control={<Toggle checked={true} />}
                    />
                    <SettingItem
                        icon={<Shield size={18} />}
                        label="Credit Style"
                        control={<span className="text-subtle" style={{ fontSize: 12 }}>Minimal &gt;</span>}
                    />
                </div>

                <div className="settings-section">
                    <div className="settings-header">Export Preferences</div>
                    <SettingItem
                        icon={<Smartphone size={18} />}
                        label="Default Platform"
                        control={<span className="text-subtle" style={{ fontSize: 12 }}>WhatsApp &gt;</span>}
                    />
                </div>

                <div className="settings-section">
                    <div className="settings-header">App</div>
                    <SettingItem
                        label="App Theme"
                        control={<span className="text-subtle" style={{ fontSize: 12 }}>Cinematic Dark</span>}
                    />
                    <SettingItem
                        label="Version"
                        control={<span className="text-subtle" style={{ fontSize: 12 }}>v0.1.0 Beta</span>}
                    />
                </div>

            </div>
        </div>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="stat-item">
            <span className="stat-val">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

function SettingItem({ icon, label, control }) {
    return (
        <div className="settings-item">
            <div className="flex-center" style={{ gap: 12 }}>
                {icon && <div style={{ color: 'var(--color-text-secondary)' }}>{icon}</div>}
                <span className="setting-label">{label}</span>
            </div>
            <div>
                {control}
            </div>
        </div>
    );
}

function Toggle({ checked }) {
    return (
        <div className={`toggle-switch ${checked ? 'on' : ''}`}>
            <div className="toggle-knob" />
        </div>
    );
}
