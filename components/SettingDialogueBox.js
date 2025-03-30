import React from 'react';

export default function SettingDialogueBox({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="setting-dialogue-box">
            <h3>Settings</h3>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
