import { ReactNode } from 'react';

export interface ButtonProps {
    isMobile?: boolean;
    isTab?: boolean;
}

export interface OutlinedButtonProps {
    Icon: React.ComponentType<any>;
    onClick: () => void;
    isFocused?: boolean;
    tooltip?: string;
    badge?: string | null;
    lottieOption?: any;
    disabledOpacity?: number;
    renderRightComponent?: (() => React.ReactNode) | null;
    disabled?: boolean;
    large?: boolean;
    btnID?: string;
    color?: string;
    focusIconColor?: string;
    isRequestProcessing?: boolean;
    borderColor?: string;
    bgColor?: string;
    id?: string;
    buttonText?: string;
    tooltipTitle?: string;
}

export interface MobileIconButtonProps {
    badge?: string | null;
    onClick: () => void;
    Icon: React.ComponentType<any>;
    isFocused?: boolean;
    bgColor?: string;
    disabledOpacity?: number;
    focusIconColor?: string;
    disabled?: boolean;
    large?: boolean;
    tooltipTitle?: string;
    btnID?: string;
    buttonText?: string | null;
    lottieOption?: any;
    id?: string;
}

export interface SingleMicMenuProps {
    micArr: { deviceId: string; label: string }[];
    Icon?: React.ComponentType;
    label: string;
    classes: any;
    changeMic: (deviceId: string) => void;
    handleClose: () => void;
}

export interface MicMenuProps {
    localMicOn: boolean;
    downArrow: boolean;
    mics: { deviceId: string; label: string }[];
    classes: any;
    handleClose: () => void;
    tollTipEl: React.RefObject<HTMLDivElement>;
    changeMic: (deviceId: string) => void;
}

export interface BottomBarProps {
    bottomBarHeight: number;
    sideBarMode: string | null;
    setSideBarMode: (mode: string | null) => void;
    setIsMeetingLeft: (left: boolean) => void;
    selectWebcamDeviceId: string | null;
    setSelectWebcamDeviceId: (id: string | null) => void;
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
    controlsVisible: boolean;
}