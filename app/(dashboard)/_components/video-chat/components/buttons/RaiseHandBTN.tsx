import React from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import { PanTool as RaiseHandIcon } from "@material-ui/icons";

interface RaiseHandBTNProps {
    isMobile: boolean;
    isTab: boolean;
}

export const RaiseHandBTN: React.FC<RaiseHandBTNProps> = ({
    isMobile,
    isTab,
}) => {
    const { publish } = usePubSub("RAISE_HAND");

    const handleRaiseHand = () => {
        publish("Raise hand", {
            persist: false,
        });
    };

    return (
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
