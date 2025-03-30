import { create } from 'zustand';

interface MeetingState {
  meetingId: string | null;
  token: string | null;
  participantName: string;
  controlsVisible: boolean;
  videoState: {
    controlsVisible: boolean;
  };
}

interface MeetingActions {
  setMeetingDetails: (details: { meetingId: string; token: string; participantName: string }) => void;
  setVideoState: (state: { controlsVisible: boolean }) => void;
  resetMeetingState: () => void;
}

type MeetingStore = MeetingState & MeetingActions;

const initialState: MeetingState = {
  meetingId: null,
  token: null,
  participantName: '',
  controlsVisible: true,
  videoState: {
    controlsVisible: true,
  },
};

export const useMeetingStore = create<MeetingStore>((set) => ({
  ...initialState,
  setMeetingDetails: (details) => set({
    meetingId: details.meetingId,
    token: details.token,
    participantName: details.participantName
  }),
  setVideoState: (state) => set((prevState) => ({
    videoState: {
      ...prevState.videoState,
      ...state,
    }
  })),
  resetMeetingState: () => set(initialState)
}));
