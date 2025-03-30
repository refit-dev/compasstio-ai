import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ScreenShareIcon from "../../icons/Bottombar/ScreenShareIcon";
import { useMeeting } from "@videosdk.live/react-sdk";

interface ButtonProps {
    isMobile: boolean;
    isTab: boolean;
}

export const ScreenShareBTN = ({ isMobile, isTab }: ButtonProps) => {
    const mMeeting = useMeeting();
    const localScreenShareOn = mMeeting?.localScreenShareOn;
    const toggleScreenShare = mMeeting?.toggleScreenShare;
    const presenterId = mMeeting?.presenterId;

    return isMobile || isTab ? (
        <MobileIconButton
            btnID="ScreenShareBTN_Mobile"
            tooltipTitle={
                presenterId
                    ? localScreenShareOn
                        ? "Stop Presenting"
                        : null
                    : "Present Screen"
            }
            buttonText={
                presenterId
                    ? localScreenShareOn
                        ? "Stop Presenting"
                        : null
                    : "Present Screen"
            }
            isFocused={localScreenShareOn}
            Icon={ScreenShareIcon}
            onClick={() => {
                toggleScreenShare?.();
            }}
            disabled={
                presenterId
                    ? localScreenShareOn
                        ? false
                        : true
                    : isMobile
                        ? true
                        : false
            }
            badge={""}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            large={false}
            lottieOption={null}
        />
    ) : (
        <OutlinedButton
            Icon={ScreenShareIcon}
            onClick={() => {
                toggleScreenShare?.();
            }}
            isFocused={localScreenShareOn}
            tooltip={
                presenterId
                    ? localScreenShareOn
                        ? "Stop Presenting"
                        : null
                    : "Present Screen"
            }
            disabled={presenterId ? (localScreenShareOn ? false : true) : false}
            badge={""}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            large={false}
            lottieOption={null}
            renderRightComponent={() => null}
            btnID={"ScreenShareBTN"}
            color={""}
            isRequestProcessing={false}
            borderColor={""}
        />
    );
};