import React from 'react';
import { Play, TrendingUp, Moon, Sun } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let greeting = 'Hey there';
    if (hours < 12) greeting = 'Good morning';
    else if (hours < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    return (
        <div className="view-container home-view">
            <header className="home-header fade-in">
                <h1 className="greeting">{greeting}, Nai</h1>
                <p className="subtitle">Today's Dopamine Menu</p>
            </header>

            {/* Main Hero Card - Today's Menu */}
            <section className="hero-section fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="hero-card">
                    <div className="hero-content">
                        <div className="chip-mood">Focus Flow</div>
                        <h2>Afternoon Deep Work</h2>
                        <div className="meta-row">
                            <span>8 clips</span>
                            <div className="dot-sep" />
                            <span>42s</span>
                        </div>
                        <button className="btn-play-hero">
                            <Play fill="currentColor" size={16} />
                            <span>Play Menu</span>
                        </button>
                    </div>
                    <div className="hero-media-preview">
                        {/* Placeholder gradient/image */}
                    </div>
                </div>
            </section>

            {/* Recommended Menus */}
            <section className="section-row fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="section-header">
                    <h3>Dopamine Menus</h3>
                    <span className="link-more">View all</span>
                </div>
                <div className="horizontal-scroll">
                    <MenuCard icon={<Sun size={20} />} title="Morning Hype" count="12 clips" color="var(--color-accent)" />
                    <MenuCard icon={<Moon size={20} />} title="Night Calm" count="6 clips" color="#8b5cf6" />
                    <MenuCard icon={<TrendingUp size={20} />} title="Creative Spark" count="15 clips" color="#ec4899" />
                </div>
            </section>

            {/* Recent Sasarts */}
            <section className="section-row fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="section-header">
                    <h3>Your Sasart Films</h3>
                </div>
                <div className="recent-list">
                    <SasartItem title="Night Drift" date="Yesterday" />
                    <SasartItem title="Weekend Vibes" date="2 days ago" />
                    <SasartItem title="Gym PRs" date="Last week" />
                </div>
            </section>
        </div>
    );
}

function MenuCard({ icon, title, count, color }) {
    return (
        <div className="menu-card">
            <div className="menu-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="menu-info">
                <h4>{title}</h4>
                <span>{count}</span>
            </div>
        </div>
    );
}

function SasartItem({ title, date }) {
    return (
        <div className="sasart-item">
            <div className="sasart-thumb" />
            <div className="sasart-info">
                <h4>{title}</h4>
                <span>{date}</span>
            </div>
            <button className="btn-icon-only">
                <Play size={16} />
            </button>
        </div>
    );
}
