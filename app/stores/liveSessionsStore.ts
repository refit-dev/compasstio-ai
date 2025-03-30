import { create, StateCreator } from 'zustand'; // Import StateCreator
import { persist, PersistOptions } from 'zustand/middleware';

interface LiveSessionsState {
    // Meeting configuration
    activeMeetingId: string | null;
    token: string | null;
    participantName: string;
    micEnabled: boolean;
    webcamEnabled: boolean;

    // Actions
    setActiveMeeting: (id: string | null, token: string | null) => void;
    setParticipantName: (name: string) => void;
    setMicEnabled: (enabled: boolean) => void;
    setWebcamEnabled: (enabled: boolean) => void;
    resetMeeting: () => void;
}

// Define the type for the persisted part of the state
type PersistedState = Pick<LiveSessionsState, 'participantName' | 'micEnabled' | 'webcamEnabled'>;

// Define the persist options with explicit types
const persistOptions: PersistOptions<LiveSessionsState, PersistedState> = {
    name: 'live-sessions-storage',
    partialize: (state) => ({
        participantName: state.participantName,
        micEnabled: state.micEnabled,
        webcamEnabled: state.webcamEnabled,
    }),
};

// Create the store with persist middleware, casting the result
export const useLiveSessionsStore = create<LiveSessionsState>(
    persist(
        (set) => ({
            // Initial state
            activeMeetingId: null,
            token: null,
            participantName: 'Participant',
            micEnabled: true,
            webcamEnabled: true,

            // Actions
            setActiveMeeting: (id, token) => set({ activeMeetingId: id, token }),
            setParticipantName: (name) => set({ participantName: name }),
            setMicEnabled: (enabled) => set({ micEnabled: enabled }),
            setWebcamEnabled: (enabled) => set({ webcamEnabled: enabled }),
            resetMeeting: () => set((state) => ({
                activeMeetingId: null,
                token: null,
                // Preserve the user's media preferences
                micEnabled: state.micEnabled,
                webcamEnabled: state.webcamEnabled,
                participantName: state.participantName
            })),
        }),
        persistOptions // Pass the typed options object
    ) as StateCreator<LiveSessionsState> // Cast the middleware result
);