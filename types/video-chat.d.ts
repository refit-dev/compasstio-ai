import React from 'react';
import { Participant as BaseParticipant } from '@videosdk.live/react-sdk';

interface DeviceSelection {
  id: string | null;
  label?: string;
}

interface RaisedHandParticipant {
  participantId: string;
  raisedHandOn: number;
}

interface MeetingConfig {
  meetingId: string;
  micEnabled: boolean;
  webcamEnabled: boolean;
  name: string;
}

interface TabItem {
  name: string;
  title: string;
  content: React.ReactNode;
}

interface MeetingContainerProps {
  onMeetingLeave: () => void;
  setIsMeetingLeft: (left: boolean) => void;
  selectedMic: DeviceSelection;
  selectedWebcam: DeviceSelection;
  selectWebcamDeviceId: string | null;
  setSelectWebcamDeviceId: (id: string | null) => void;
  selectMicDeviceId: string | null;
  setSelectMicDeviceId: (id: string | null) => void;
  participantRaisedHand: (participantId: string) => void;
  raisedHandsParticipants: RaisedHandParticipant[];
  micEnabled: boolean;
  webcamEnabled: boolean;
}

interface Participant extends BaseParticipant {
  webcamStream: MediaStream | null;
  webcamOn: boolean;
  micOn: boolean;
  displayName: string;
}

export {
  DeviceSelection,
  RaisedHandParticipant,
  MeetingConfig,
  TabItem,
  MeetingContainerProps,
  Participant
};
