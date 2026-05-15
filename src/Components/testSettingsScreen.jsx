import { useState } from "react";

export default function TestSettingsScreen({ onClose, isDark, setIsDark, language, setLanguage, fontSize, setFontSize }) {

    const fontSizes = { Small: '13px', Default: '15px', Large: '18px' };
    const languages = [
        { label: '🇬🇧 English', value: 'English' },
        { label: '🇬🇷 Greek',   value: 'Greek'   },
        { label: '🇩🇪 German',  value: 'German'  },
        { label: '🇫🇷 French',  value: 'French'  },
    ];

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('mode-dark', next);
    };

    const changeFont = (size) => {
        setFontSize(size);
        document.documentElement.style.setProperty('--font-size-base', fontSizes[size]);
    };

    const sectionLabel = {
        fontSize: '11px', color: 'var(--text-secondary, #888)',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        marginBottom: '10px', display: 'block'
    };

    const optionBtn = (active) => ({
        padding: '8px 10px',
        borderRadius: '8px',
        border: active ? '1px solid #4a90d9' : '1px solid var(--border, #444)',
        background: active ? 'rgba(74,144,217,0.15)' : 'none',
        color: active ? '#4a90d9' : 'var(--text-primary)',
        fontSize: '13px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
    });

    return (
        <div id="SettingsScreen" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px', borderBottom: '1px solid var(--border, #333)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>
                    Settings
                </h2>
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                    >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '20px', lineHeight: 1 }}>
                    ✕
                </button>
            </div>

            {/* Appearance */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
                <span style={sectionLabel}>Appearance</span>

                {/* Dark mode toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        {isDark ? '🌙 Dark mode' : '☀️ Bright mode'}
                    </span>
                    <button onClick={toggleDark} style={{
                        width: '44px', height: '24px', borderRadius: '12px',
                        background: isDark ? '#4a90d9' : 'var(--border, #555)',
                        border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
                    }}>
                        <span style={{
                            position: 'absolute', top: '3px',
                            left: isDark ? '23px' : '3px',
                            width: '18px', height: '18px', borderRadius: '50%',
                            background: 'white', transition: 'left 0.2s'
                        }} />
                    </button>
                </div>

                {/* Font size */}
                <span style={{ ...sectionLabel, marginTop: '4px' }}>Font size</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {['Small', 'Default', 'Large'].map(size => (
                        <button key={size} onClick={() => changeFont(size)} style={{
                            ...optionBtn(fontSize === size),
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', padding: '8px 0'
                        }}>
                            <span style={{ fontSize: size === 'Small' ? '11px' : size === 'Default' ? '15px' : '20px', marginBottom: '2px' }}>Aa</span>
                            <span style={{ fontSize: '12px' }}>{size}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Language */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
                <span style={sectionLabel}>Language</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {languages.map(({ label, value }) => (
                        <button key={value} onClick={() => setLanguage(value)} style={optionBtn(language === value)}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* About */}
            <div style={{ padding: '14px 20px' }}>
                <button onClick={() => window.open('https://culturalmemory.gr', '_blank')} style={{
                    ...optionBtn(false),
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', width: '100%'
                }}>
                    <span>ℹ️ About us</span>
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>↗</span>
                </button>
            </div>
        <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo" style={{ position:'absolute', bottom: '70px', left: '50%', transform: 'translateX(-50%)', width: "100px", marginBottom: "0px", margin: "0 auto" }} />
        <p style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                textAlign: 'center',
                padding: '8px',
                fontSize: '12px',
                color: 'var(--text-primary)',
                opacity: 0.5,}}
        > 
        © 2026 Cultural Memory. All rights reserved.</p>
        </div>
    );
}