import React, { ReactNode } from "react";
import "./style.ts";
declare type Animation = {
    type: "left" | "right" | "top" | "bottom";
    speed: number;
};
interface SmartBackgroundProps {
    symbols?: (string | ReactNode | Element)[];
    random?: {
        fontSizeRange: number[];
    } | undefined;
    underlayColor?: string;
    underlayImage?: string;
    symbolsStyle?: Object;
    rotate?: number;
    symbolSize?: number;
    gap?: number;
    animation?: Animation | undefined;
    exact?: boolean;
    childrenWrapClassName?: string;
    childrenWrapStyle?: React.CSSProperties;
    [key: string]: any;
}
declare const SmartBackground: (props: SmartBackgroundProps) => JSX.Element;
export default SmartBackground;
