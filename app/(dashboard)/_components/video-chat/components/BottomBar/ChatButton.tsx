import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ChatIcon from "../../icons/Bottombar/ChatIcon";

interface ChatButtonProps {
    isMobile: boolean;
    isTab: boolean;
    sideBarMode: string | null;
    setSideBarMode: (mode: string | null) => void;
    sideBarModes: Record<string, string>;
}

export const ChatButton: React.FC<ChatButtonProps> = ({
    isMobile,
    isTab,
    sideBarMode,
    setSideBarMode,
    sideBarModes
}) => {
    const toggleSideBarMode = () => {
        if (sideBarMode === sideBarModes.CHAT) {
            setSideBarMode(null);
        } else {
            setSideBarMode(sideBarModes.CHAT);
        }
    };

    return isMobile || isTab ? (
        <MobileIconButton
            tooltipTitle={"Chat"}
            buttonText={"Chat"}
            Icon={ChatIcon}
            isFocused={sideBarMode === sideBarModes.CHAT}
            onClick={toggleSideBarMode}
            badge={""}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            btnID={"ChatBTN_Mobile"}
            lottieOption={null}
        />
    ) : (
        <OutlinedButton
            Icon={ChatIcon}
            onClick={toggleSideBarMode}
            isFocused={sideBarMode === "CHAT"}
            tooltip="View Chat"
            bgColor={"transparent"}
            badge={""}
            lottieOption={null}
            disabledOpacity={1}
            renderRightComponent={() => null}
            disabled={false}
            large={false}
            btnID={"ChatBTN"}
            color={""}
            focusIconColor={"black"}
            isRequestProcessing={false}
            borderColor={""}
        />
    );
};

export default ChatButton;