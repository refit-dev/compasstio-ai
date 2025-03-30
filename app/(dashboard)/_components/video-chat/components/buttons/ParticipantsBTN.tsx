import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ParticipantsIcon from "../../icons/Bottombar/ParticipantsIcon";
import { useMeeting } from "@videosdk.live/react-sdk";

interface ButtonProps {
    isMobile: boolean;
    isTab: boolean;
    sideBarMode: string | null;
    setSideBarMode: (mode: string | null | ((prevMode: string | null) => string | null)) => void;
    sideBarModes: Record<string, string>;
}

export const ParticipantsBTN = ({ isMobile, isTab, sideBarMode, setSideBarMode, sideBarModes }: ButtonProps) => {
    const { participants } = useMeeting();

    return isMobile || isTab ? (
        <MobileIconButton
            tooltipTitle={"Participants"}
            isFocused={sideBarMode === sideBarModes.PARTICIPANTS}
            buttonText={"Participants"}
            disabledOpacity={1}
            Icon={ParticipantsIcon}
            onClick={() => {
                setSideBarMode((s) => (s === sideBarModes.PARTICIPANTS ? null : sideBarModes.PARTICIPANTS));
            }}
            badge={`${new Map(participants)?.size}`}
            bgColor={"transparent"}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            btnID={"ParticipantsBTN_Mobile"}
            lottieOption={null}
        />
    ) : (
        <OutlinedButton
            Icon={ParticipantsIcon}
            onClick={() => {
                setSideBarMode((s) => (s === sideBarModes.PARTICIPANTS ? null : sideBarModes.PARTICIPANTS));
            }}
            isFocused={sideBarMode === sideBarModes.PARTICIPANTS}
            tooltip={"View Participants"}
            badge={`${new Map(participants)?.size}`}
            bgColor={"transparent"}
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