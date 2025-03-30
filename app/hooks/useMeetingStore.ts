import { create } from 'zustand';

interface VideoState {
  isMuted?: boolean;
  streamId?: string | null;
  participants?: string[];
  controlsVisible?: boolean;
}

interface StoreState {
  meetingId: string | null;
  token: string | null;
  joinedMeeting: boolean;
  videoState: VideoState;
  setMeetingId: (meetingId: string | null) => void;
  setToken: (token: string | null) => void;
  setJoinedMeeting: (joinMeeting: boolean) => void;
  setVideoState: (state: VideoState) => void;
}

export const useMeetingStore = create<StoreState>((set) => ({
  meetingId: null,
  token: null,
  joinedMeeting: false,
  videoState: {
    isMuted: false,
    streamId: null,
    participants: [],
    controlsVisible: true
  },
  setMeetingId: (meetingId) => set({ meetingId }),
  setToken: (token) => set({ token }),
  setJoinedMeeting: (joinedMeeting) => set({ joinedMeeting }),
  setVideoState: (videoState) => set({ videoState }),
}));
