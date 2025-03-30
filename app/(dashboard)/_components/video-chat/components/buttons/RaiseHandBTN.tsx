import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import { MobileIconButton } from "../MobileIconButton";
import RaiseHandIcon from "../../icons/Bottombar/RaiseHandIcon";
import { usePubSub } from "@videosdk.live/react-sdk";

interface ButtonProps {
    isMobile: boolean;
    isTab: boolean;
}

export const RaiseHandBTN = ({ isMobile, isTab }: ButtonProps) => {
    const { publish } = usePubSub("RAISE_HAND");

    const RaiseHand = () => {
        publish("Raise Hand", { persist: true });
    };

    return isMobile || isTab ? (
        <MobileIconButton
            tooltipTitle={"Raise hand"}
            Icon={RaiseHandIcon}
            onClick={RaiseHand}
            badge={""}
            isFocused={false}
            bgColor={"transparent"}
            disabledOpacity={1}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            btnID={"RaiseHandBTN"}
            lottieOption={null}
            buttonText={"Raise Hand"}
        />
    ) : (
        <OutlinedButton
            onClick={RaiseHand}
            tooltip={"Raise Hand"}
            bgColor={"transparent"}
            badge={""}
            disabledOpacity={1}
            focusIconColor={"black"}
            disabled={false}
            large={false}
            btnID={"RaiseHandBTN"}
            lottieOption={null}
            Icon={RaiseHandIcon}
            isFocused={false}
            renderRightComponent={() => null}
            color={""}
            isRequestProcessing={false}
            borderColor={""}
        />
    );
};