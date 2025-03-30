import React, { useEffect, useMemo, useRef } from "react";
import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import recordingBlink from "../../animations/recording-blink.json";
import useIsRecording from "../MeetingContainer/useIsRecording";
import RecordingIcon from "../../icons/Bottombar/RecordingIcon";

export const RecordingButton: React.FC = () => {
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

    const handleClick = () => {
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
            onClick={handleClick}
            isFocused={isRecording}
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
            bgColor={"transparent"}
            badge={""}
            disabledOpacity={1}
            renderRightComponent={() => null}
            disabled={false}
            large={false}
            btnID={"RecordingBTN"}
            color={""}
            focusIconColor={"black"}
            borderColor={""}
        />
    );
};

export default RecordingButton;