import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ScreenShareIcon from "../../icons/Bottombar/ScreenShareIcon";

interface ScreenShareButtonProps {
    isMobile: boolean;
    isTab: boolean;
}

export const ScreenShareButton: React.FC<ScreenShareButtonProps> = ({ isMobile, isTab }) => {
    const mMeeting = useMeeting();
    const localScreenShareOn = mMeeting?.localScreenShareOn ?? false;
    const toggleScreenShare = mMeeting?.toggleScreenShare ?? (() => { });
    const presenterId = mMeeting?.presenterId ?? null;

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
                presenterId !== null
                    ? !localScreenShareOn
                    : isMobile
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
            disabled={presenterId !== null ? !localScreenShareOn : false}
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

export default ScreenShareButton;
