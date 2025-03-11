import {cssVars} from "@stackflow/plugin-basic-ui";
import {style} from "@vanilla-extract/css";

import {f} from "../styles";

export const wrapper = style([f.posAbsFull, f.flexColumn, f.rootLineHeight]);

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
