import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import recordingBlink from "../../animations/recording-blink.json";
import useIsRecording from "../MeetingContainer/useIsRecording";
import RecordingIcon from "../../icons/Bottombar/RecordingIcon";
import { OutlinedButton } from "../OutlinedButton";

interface RecordingBTNProps {
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
}

export const RecordingBTN = ({
    selectMicDeviceId,
    setSelectMicDeviceId,
}: RecordingBTNProps) => {
    const mMeeting = useMeeting();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: recordingBlink,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        height: 64,
        width: 160,
    };
    const startRecording = mMeeting?.startRecording;
    const stopRecording = mMeeting?.stopRecording;
    const recordingState = mMeeting?.recordingState;

    const isRecording = useIsRecording();

    const isRecordingRef = useRef(isRecording);

    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    const { isRequestProcessing } = useMemo(
        () => ({
            isRequestProcessing:
                recordingState === Constants.recordingEvents.RECORDING_STARTING ||
                recordingState === Constants.recordingEvents.RECORDING_STOPPING,
        }),
        [recordingState]
    );

    const _handleClick = () => {
        const isRecording = isRecordingRef.current;

        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <OutlinedButton
            Icon={RecordingIcon}
            onClick={_handleClick}
            isFocused={isRecording}
            bgColor=""
            badge={null}
            disabledOpacity={0.7}
            renderRightComponent={null}
            disabled={false}
            large={false}
            btnID=""
            color=""
            focusIconColor=""
            borderColor=""
            tooltip={
                recordingState === Constants.recordingEvents.RECORDING_STARTED
                    ? "Stop Recording"
                    : recordingState === Constants.recordingEvents.RECORDING_STARTING
                        ? "Starting Recording"
                        : recordingState === Constants.recordingEvents.RECORDING_STOPPED
                            ? "Start Recording"
                            : recordingState === Constants.recordingEvents.RECORDING_STOPPING
                                ? "Stopping Recording"
                                : "Start Recording"
            }
            lottieOption={isRecording ? defaultOptions : null}
            isRequestProcessing={isRequestProcessing}
        />
    );
};