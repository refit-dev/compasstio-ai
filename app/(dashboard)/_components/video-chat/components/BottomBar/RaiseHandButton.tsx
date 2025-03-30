import React from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import RaiseHandIcon from "../../icons/Bottombar/RaiseHandIcon";

interface RaiseHandButtonProps {
    isMobile: boolean;
    isTab: boolean;
}

export const RaiseHandButton: React.FC<RaiseHandButtonProps> = ({ isMobile, isTab }) => {
    const { publish } = usePubSub("RAISE_HAND");

    const handleRaiseHand = () => {
        publish("Raise hand", {
            persist: false,
        });
    };

    return isMobile || isTab ? (
        <MobileIconButton
            btnID="RaiseHandBTN_Mobile"
            tooltipTitle={"Raise hand"}
            Icon={RaiseHandIcon}
            onClick={handleRaiseHand}
            buttonText={"Raise Hand"}
            badge={""}
            isFocused={false}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            lottieOption={null}
        />
    ) : (
        <OutlinedButton
            Icon={RaiseHandIcon}
            onClick={handleRaiseHand}
            isFocused={false}
            tooltip={"Raise Hand"}
            badge={""}
            lottieOption={null}
            disabledOpacity={1}
            renderRightComponent={() => null}
            disabled={false}
            large={false}
            btnID={"RaiseHandBTN"}
            color={""}
            focusIconColor={"black"}
            isRequestProcessing={false}
            borderColor={""}
            bgColor={"transparent"}
        />
    );
};

export default RaiseHandButton;