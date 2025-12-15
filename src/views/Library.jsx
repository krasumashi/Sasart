import React, { useState, useEffect } from 'react';
import { Search, Instagram, Youtube, Camera, Video } from 'lucide-react';
import { mockData } from '../services/mockData';
import '../styles/Library.css';

const FILTERS = ['All', 'Favorites', 'Hype', 'Calm', 'Funny', 'Weird'];

export default function Library() {
    const [activeTab, setActiveTab] = useState('clips');
    const [activeFilter, setActiveFilter] = useState('All');
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        mockData.getClips().then(data => {
            setClips(data);
            setLoading(false);
        });
    }, []);

    const getFilteredClips = () => {
        if (activeFilter === 'All') return clips;
        // Simple mock filter
        return clips.filter(c => c.moods.includes(activeFilter));
    };

    const filtered = getFilteredClips();

    return (
        <div className="view-container library-view">
            {/* Header with Search & Filter */}
            <div className="library-header">
                <div className="search-bar-container">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search clips..."
                    />
                </div>

                <div className="filter-scroll">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="library-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'clips' ? 'active' : ''}`}
                        onClick={() => setActiveTab('clips')}
                    >
                        Clips
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'menus' ? 'active' : ''}`}
                        onClick={() => setActiveTab('menus')}
                    >
                        Menus
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="library-content fade-in">
                {loading ? (
                    <div className="empty-state">Loading library...</div>
                ) : activeTab === 'clips' ? (
                    <div className="library-grid">
                        {filtered.map(clip => (
                            <ClipItem key={clip.id} clip={clip} />
                        ))}
                        {filtered.length === 0 && (
                            <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                                No clips found for "{activeFilter}"
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Dopamine Menus coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ClipItem({ clip }) {
    const SourceIcon = () => {
        switch (clip.source) {
            case 'instagram': return <Instagram size={10} color="#fff" />;
            case 'youtube': return <Youtube size={10} color="#fff" />;
            case 'camera': return <Camera size={10} color="#fff" />;
            default: return <Video size={10} color="#fff" />;
        }
    };

    return (
        <div className="clip-thumb">
            {/* Abstract Gradient Placeholder for now */}
            <div
                className="thumb-gradient"
                style={{ background: clip.thumbnail }}
            />

            <div className="source-badge">
                <SourceIcon />
            </div>

            <div className="clip-meta-overlay">
                <span>{clip.duration}s</span>
            </div>
        </div>
    );
}
