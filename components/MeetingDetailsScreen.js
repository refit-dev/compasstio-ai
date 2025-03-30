import React from 'react';

export const MeetingDetailsScreen = ({ participantName, meetingId, onClick }) => {
    return (
        <div className="meeting-details-screen">
            <h2>Meeting Details</h2>
            <p>Name: {participantName}</p>
            <p>Meeting ID: {meetingId}</p>
            <button onClick={onClick}>Join Meeting</button>
        </div>
    );
};
