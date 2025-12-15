import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Play, Send, Sparkles, X } from 'lucide-react';
import '../styles/Editor.css';

export default function EditorView({ config, selectedClips, onBack }) {
    const [timeline, setTimeline] = useState(selectedClips.map((c, i) => ({
        ...c,
        // Simulate AI duration cut
        editDuration: Math.max(2, c.duration * 0.5).toFixed(1)
    })));

    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', text: `I've assembled a ${config.rhythm} cut using your ${selectedClips.length} clips. Want to tweak the pacing?` }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (chatOpen) scrollToBottom();
    }, [messages, chatOpen]);

    // Mock AI Response
    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Simulate thinking delay
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                role: 'ai',
                text: "Got it. I'll smooth out those transitions and shorten the middle section to keep the energy high."
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <div className="editor-layout fade-in">
            <header className="editor-header">
                <button onClick={onBack}><ChevronLeft size={24} /></button>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px' }}>Draft Cut</h3>
                    <span style={{ fontSize: '10px', color: '#888' }}>{timeline.length} clips · {config.duration}s</span>
                </div>
                <button><MoreHorizontal size={24} /></button>
            </header>

            {/* Timeline List */}
            <div className="timeline-area">
                {timeline.map((clip, idx) => (
                    <div key={clip.id} className="timeline-tile">
                        <div className="tile-thumb" style={{ background: clip.thumbnail }} />
                        <div className="tile-info">
                            <h4>{clip.title}</h4>
                            <div className="tile-meta">
                                <span>{clip.source}</span>
                                <span>•</span>
                                <span className="tile-duration">{clip.editDuration}s</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                            <MoreHorizontal size={16} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Director Chat Dock */}
            <div className="director-chat-dock">
                {!chatOpen ? (
                    <div className="chat-input-area" onClick={() => setChatOpen(true)}>
                        <Sparkles size={18} color="var(--color-accent)" />
                        <span style={{ fontSize: '12px', color: '#888' }}>Ask Director to edit...</span>
                    </div>
                ) : (
                    <>
                        <div className="panel-handle" style={{
                            width: 40, height: 4, background: '#333', borderRadius: 2, margin: '8px auto'
                        }} onClick={() => setChatOpen(false)} />

                        <div className="chat-history">
                            {messages.map(m => (
                                <div key={m.id} className={`chat-message ${m.role}`}>
                                    {m.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <input
                                className="chat-input-field"
                                placeholder="Make it faster..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                autoFocus
                            />
                            <button className="btn-send" onClick={handleSend}>
                                <Send size={16} fill="currentColor" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
