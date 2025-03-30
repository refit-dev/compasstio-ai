import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import ChatIcon from "../../icons/Bottombar/ChatIcon";

interface ButtonProps {
  isMobile: boolean;
  isTab: boolean;
  sideBarMode: string | null;
  setSideBarMode: (mode: string | null | ((prevMode: string | null) => string | null)) => void;
  sideBarModes: Record<string, string>;
}

export const ChatBTN = ({ isMobile, isTab, sideBarMode, setSideBarMode, sideBarModes }: ButtonProps) => {
  return isMobile || isTab ? (
    <MobileIconButton
      tooltipTitle={"Chat"}
      buttonText={"Chat"}
      Icon={ChatIcon}
      isFocused={sideBarMode === sideBarModes.CHAT}
      onClick={() => {
        setSideBarMode((s) => (s === sideBarModes.CHAT ? null : sideBarModes.CHAT));
      }}
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
      onClick={() => {
        setSideBarMode((s) => (s === sideBarModes.CHAT ? null : sideBarModes.CHAT));
      }}
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