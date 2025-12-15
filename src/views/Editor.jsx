import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Send, Sparkles, GripVertical } from 'lucide-react';
import '../styles/Editor.css';

export default function EditorView({ config, selectedClips, onBack }) {
    // Initialize timeline
    const [timeline, setTimeline] = useState(() => {
        return selectedClips.map((c, i) => ({
            ...c,
            editDuration: Math.max(2, c.duration * 0.5).toFixed(1)
        }));
    });

    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', text: `I've assembled a ${config.rhythm} cut. Drag to reorder, or tell me what to change.` }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // Drag & Drop Refs
    const dragItem = useRef();
    const dragOverItem = useRef();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (chatOpen) scrollToBottom();
    }, [messages, chatOpen]);

    // Drag Handlers
    const onDragStart = (e, position) => {
        dragItem.current = position;
        // e.target.classList.add('dragging'); // Optional visual feedback
        e.dataTransfer.effectAllowed = "move"; // Better UX
    };

    const onDragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const onDragEnd = (e) => {
        // e.target.classList.remove('dragging');
        const copyListItems = [...timeline];
        const dragItemContent = copyListItems[dragItem.current];

        // Remove and Insert
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        dragItem.current = null;
        dragOverItem.current = null;
        setTimeline(copyListItems);
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        const userMsg = { id: Date.now(), role: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                text: "Refining the cut based on your input..."
            }]);
        }, 1000);
    };

    return (
        <div className="editor-layout fade-in">
            {/* Glass Header */}
            <header className="editor-header">
                <button onClick={onBack}><ChevronLeft size={24} color="#fff" /></button>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Draft Cut</h3>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                        {config.rhythm} Mode · {timeline.length} clips
                    </span>
                </div>
                <button><MoreHorizontal size={24} color="#fff" /></button>
            </header>

            {/* Draggable Timeline */}
            <div className="timeline-area">
                {timeline.map((clip, idx) => (
                    <div
                        key={clip.id}
                        className="timeline-tile"
                        draggable
                        onDragStart={(e) => onDragStart(e, idx)}
                        onDragEnter={(e) => onDragEnter(e, idx)}
                        onDragEnd={onDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div className="tile-handle">
                            <GripVertical size={20} />
                        </div>
                        <div className="tile-thumb" style={{ background: clip.thumbnail }} />
                        <div className="tile-info">
                            <h4>{clip.title}</h4>
                            <div className="tile-meta">
                                <span className="tile-duration">{clip.editDuration}s</span>
                                <span>•</span>
                                <span>{clip.source}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Director Chat V2 */}
            <div className={`director-chat-dock ${chatOpen ? 'open' : ''}`}>
                {/* Chat content rendered conditionally or just always there but small */}
                {/* For V2, let's keep it simple: always show input, expand on focus/click */}

                {chatOpen && (
                    <div className="chat-history">
                        {messages.map(m => (
                            <div key={m.id} className={`chat-message ${m.role}`}>
                                {m.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                <div className="chat-input-area" onClick={() => setChatOpen(true)}>
                    {!chatOpen && <Sparkles size={18} color="var(--color-accent)" style={{ marginRight: 8 }} />}
                    <input
                        className="chat-input-field"
                        placeholder="Tell Director to change something..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    {chatOpen && (
                        <button className="btn-send" onClick={handleSend}>
                            <Send size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
