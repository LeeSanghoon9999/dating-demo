import {cssVars} from "@stackflow/plugin-basic-ui";
import {style} from "@vanilla-extract/css";

import {f} from "../styles";

export const wrapper = style([f.posAbsFull, f.flexColumn, f.rootLineHeight]);

export const appBarLeftTop = style([
    f.flex,
    {
        fontSize: "1.125rem",
        fontWeight: 700,
    },
]);

export const appBarLeftIcon = style([
    f.flexAlignCenter,
    {
        marginRight: ".5rem",
    },
]);

export const appBarRightTop = style([
    {
        display: "grid",
        gridTemplateColumns: "1.5rem 1.5rem 1.5rem",
        gap: "1rem",
    },
]);

export const appBarRightBottom = style([
    {
        fontSize: "0.8rem",
        fontWeight: 500,
    },
]);

export const appBarRight = style([
    f.flex,
    {
        flexDirection: "column",
        marginRight: ".5rem",
        alignItems: "flex-end",
    },
]);

export const scrollable = style([
    f.flex1,
    f.overflowScroll,
    {
        paddingTop: [
            `calc(${cssVars.appBar.height} + constant(safe-area-inset-top))`,
            `calc(${cssVars.appBar.height} + env(safe-area-inset-top))`,
        ],
    },
]);

export const bottom = style({});


export const appBarLeftBottom = style([
    f.flex,
    {
        fontSize: "0.8rem",
        fontWeight: 500,
    },
]);

export const appBarLeft = style([
    f.flex,
    {
        flexDirection: "column",
        marginLeft: ".5rem",
    },
]);
