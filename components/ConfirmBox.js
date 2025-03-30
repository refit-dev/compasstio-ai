import React from 'react';

export default function ConfirmBox({ open, onConfirm, onCancel, title, message }) {
    if (!open) return null;

    return (
        <div className="confirm-box">
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="confirm-actions">
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}
