import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ParticipantsIcon from "../../icons/Bottombar/ParticipantsIcon";

interface ParticipantsButtonProps {
    isMobile: boolean;
    isTab: boolean;
    sideBarMode: string | null;
    setSideBarMode: (mode: string | null) => void;
    sideBarModes: Record<string, string>;
}

export const ParticipantsButton: React.FC<ParticipantsButtonProps> = ({
    isMobile,
    isTab,
    sideBarMode,
    setSideBarMode,
    sideBarModes
}) => {
    const toggleSideBarMode = () => {
        if (sideBarMode === sideBarModes.PARTICIPANTS) {
            setSideBarMode(null);
        } else {
            setSideBarMode(sideBarModes.PARTICIPANTS);
        }
    };

    const { participants } = useMeeting();
    const participantCount = Object.keys(participants).length;

    return isMobile || isTab ? (
        <MobileIconButton
            tooltipTitle={"Participants"}
            buttonText={"Participants"}
            Icon={ParticipantsIcon}
            isFocused={sideBarMode === sideBarModes.PARTICIPANTS}
            onClick={toggleSideBarMode}
            badge={participantCount > 0 ? participantCount.toString() : ""}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            btnID={"ParticipantsBTN_Mobile"}
            lottieOption={null}
        />
    ) : (
        <OutlinedButton
            Icon={ParticipantsIcon}
            onClick={toggleSideBarMode}
            isFocused={sideBarMode === "PARTICIPANTS"}
            tooltip="View Participants"
            bgColor={"transparent"}
            badge={participantCount > 0 ? participantCount.toString() : ""}
            lottieOption={null}
            disabledOpacity={1}
            renderRightComponent={() => null}
            disabled={false}
            large={false}
            btnID={"ParticipantsBTN"}
            color={""}
            focusIconColor={"black"}
            isRequestProcessing={false}
            borderColor={""}
        />
    );
};

export default ParticipantsButton;
