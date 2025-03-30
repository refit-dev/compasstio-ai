import React, { useEffect, useState } from 'react';
import { useParticipant } from "@videosdk.live/react-sdk";
import { useRouter } from 'next/navigation';
import { useMeetingContext } from '@/app/context/MeetingContext';

interface VideoConferenceProps {
    onMeetingLeave: () => void;
}

interface Participant {
    id: string;
    displayName?: string;
}

// ParticipantView component using useParticipant hook
const ParticipantView = ({ participantId }: { participantId: string }) => {
    const { webcamStream, micStream, displayName } = useParticipant(participantId);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {webcamStream && (
                <video
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    ref={(el) => {
                        if (el && webcamStream) {
                            el.srcObject = new MediaStream([webcamStream.track]);
                        }
                    }}
                />
            )}
            <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '2px 4px',
                borderRadius: '4px',
                fontSize: '0.8rem'
            }}>
                {displayName || `Participant ${participantId.slice(-4)}`}
            </div>
        </div>
    );
};

/**
 * Main VideoConference component that handles the meeting UI and functionality
 */
const VideoConference: React.FC<VideoConferenceProps> = ({
    onMeetingLeave,
}) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState<boolean>(false);
    const { isMeetingActive, mMeeting, endMeeting } = useMeetingContext();

    // Set client flag on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // --- Client-side only rendering ---
    // Render placeholder during SSR or before client mount
    if (!isClient) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div>Loading Video...</div>
            </div>
        );
    }

    // Continue with the same logic, but be defensive about mMeeting being null
    const participants = mMeeting?.participants ? [...mMeeting.participants.keys()] : [];
    const localParticipantId = mMeeting?.localParticipant?.id;

    // Derived state
    const isMeetingJoined = mMeeting?.isMeetingJoined || false;
    const isMeetingLeft = !isMeetingActive || (mMeeting && !isMeetingJoined);

    // Render loading/joining state with more complete checks
    if (!isMeetingActive || !mMeeting || !isMeetingJoined) {
        if (!isMeetingActive) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1rem' }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Meeting ended or inactive</div>
                </div>
            );
        }
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '1rem'
            }}>
                <div>Joining meeting...</div>
            </div>
        );
    }

    // Render meeting left state
    if (isMeetingLeft && !isMeetingActive) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '1rem'
            }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    You have left the meeting
                </div>
                <button
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => router.push('/dashboard')}
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Main meeting UI
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Participant Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                {/* Local Participant (Self View) */}
                {localParticipantId && (
                    <div
                        key={localParticipantId}
                        style={{
                            width: participants.length === 0 ? "100%" : "50%",
                            height: participants.length === 0 ? "100%" : "50%",
                            padding: '0.25rem',
                            position: 'relative',
                            backgroundColor: 'black'
                        }}
                    >
                        <ParticipantView participantId={localParticipantId} />
                    </div>
                )}
                {/* Remote Participants */}
                {participants
                    .filter(id => id !== localParticipantId)
                    .map((participantId) => (
                        <div
                            key={participantId}
                            style={{
                                width: "50%",
                                height: "50%",
                                padding: '0.25rem',
                                position: 'relative',
                                backgroundColor: 'black'
                            }}
                        >
                            <ParticipantView participantId={participantId} />
                        </div>
                    ))
                }
            </div>

            {/* Meeting controls */}
            <div
                style={{
                    padding: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flexShrink: 0
                }}
            >
                <button
                    style={{
                        margin: '0 0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: mMeeting?.localMicOn ? '#6b7280' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => mMeeting?.toggleMic()}
                >
                    {mMeeting?.localMicOn ? "Mute" : "Unmute"}
                </button>

                <button
                    style={{
                        margin: '0 0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: mMeeting?.localWebcamOn ? '#6b7280' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => mMeeting?.toggleWebcam()}
                >
                    {mMeeting?.localWebcamOn ? "Stop Camera" : "Start Camera"}
                </button>

                <button
                    style={{
                        margin: '0 0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        endMeeting();
                        onMeetingLeave();
                    }}
                >
                    Leave
                </button>
            </div>
        </div>
    );
};

export default VideoConference;
