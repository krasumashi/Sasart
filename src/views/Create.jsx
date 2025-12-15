import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Mic, Sparkles } from 'lucide-react';
import '../styles/Create.css';
import { mockData } from '../services/mockData';

// Steps
const STEP_SELECT = 1;
const STEP_RHYTHM = 2;
const STEP_EDITOR = 3;

export default function Create() {
    const [step, setStep] = useState(STEP_SELECT);
    const [availableClips, setAvailableClips] = useState([]);
    const [selectedClipIds, setSelectedClipIds] = useState([]);
    const [config, setConfig] = useState({
        duration: 30,
        rhythm: 'Wave', // 'Slow Burn', 'Wave', 'Music Video'
        vibe: 'Cinematic'
    });

    useEffect(() => {
        mockData.getClips().then(setAvailableClips);
    }, []);

    const toggleClip = (id) => {
        if (selectedClipIds.includes(id)) {
            setSelectedClipIds(ids => ids.filter(i => i !== id));
        } else {
            setSelectedClipIds(ids => [...ids, id]);
        }
    };

    const handleNext = () => {
        if (step === STEP_SELECT && selectedClipIds.length > 0) {
            setStep(STEP_RHYTHM);
        } else if (step === STEP_RHYTHM) {
            // Simulate "AI Generation"
            generateDraft();
        }
    };

    const generateDraft = () => {
        // In real app, this would process clips
        setStep(STEP_EDITOR);
    };

    const renderHeader = () => {
        let title = '';
        if (step === STEP_SELECT) title = 'Select Clips';
        if (step === STEP_RHYTHM) title = 'Set Rhythm';
        if (step === STEP_EDITOR) title = 'Director Mode';

        return (
            <header className="wizard-header">
                {step > 1 && step < 3 && (
                    <button onClick={() => setStep(step - 1)}>
                        <ChevronLeft size={24} />
                    </button>
                )}
                <h3>{title}</h3>
                <span className="step-indicator">Step {step}/3</span>
            </header>
        );
    };

    if (step === STEP_EDITOR) {
        return (
            <div className="view-container create-view">
                <EditorView
                    config={config}
                    selectedClips={availableClips.filter(c => selectedClipIds.includes(c.id))}
                />
            </div>
        );
    }

    return (
        <div className="view-container create-view">
            <div className="wizard-container">
                {renderHeader()}

                <div className="wizard-content">
                    {step === STEP_SELECT && (
                        <div className="clip-selector-grid">
                            {availableClips.map(clip => {
                                const isSelected = selectedClipIds.includes(clip.id);
                                const index = selectedClipIds.indexOf(clip.id) + 1;
                                return (
                                    <div
                                        key={clip.id}
                                        className={`selector-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleClip(clip.id)}
                                    >
                                        <div className="thumb-gradient" style={{ background: clip.thumbnail }} />
                                        {isSelected && <div className="selection-badge">{index}</div>}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {step === STEP_RHYTHM && (
                        <div className="rhythm-options">
                            <div className="duration-control">
                                <div className="duration-label">
                                    <span>Total Duration</span>
                                    <b>{config.duration}s</b>
                                </div>
                                <input
                                    type="range"
                                    min="15" max="60" step="5"
                                    value={config.duration}
                                    onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
                                />
                            </div>

                            <h3>Pacing Style</h3>
                            {['Slow Burn', 'Wave', 'Music Video'].map(style => (
                                <div
                                    key={style}
                                    className={`rhythm-card ${config.rhythm === style ? 'active' : ''}`}
                                    onClick={() => setConfig({ ...config, rhythm: style })}
                                >
                                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                                        <h3>{style}</h3>
                                        {config.rhythm === style && <Sparkles size={16} color="var(--color-accent)" />}
                                    </div>
                                    <p>{getRhythmDesc(style)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="wizard-footer">
                    <button
                        className="btn-primary"
                        disabled={step === STEP_SELECT && selectedClipIds.length === 0}
                        onClick={handleNext}
                    >
                        {step === STEP_SELECT ? 'Next: Rhythm' : 'Generate Draft'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function getRhythmDesc(style) {
    switch (style) {
        case 'Slow Burn': return 'Longer clips, gentle cuts, cinematic feel.';
        case 'Wave': return 'Starts slow, peaks in intensity, then calms down.';
        case 'Music Video': return 'Fast 1-2s bursts, high energy.';
        default: return '';
    }
}

import EditorView from './Editor';
