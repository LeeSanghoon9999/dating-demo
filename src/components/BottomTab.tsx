import { useActions } from "@stackflow/react";
import React from "react";

import IconChatting from "../assets/IconChatting";
import IconHome from "../assets/IconHome";
import IconMenu from "../assets/IconMenu";
import IconProfile from "../assets/IconProfile";
import IconSell from "../assets/IconSell";
import * as css from "./BottomTab.css";

const BottomTab: React.FC = () => {
    const { push } = useActions();

    return (
        <div className={css.container}>
            <button
                type="button"
                className={css.button}
                onClick={() => push("Main", { transitionType: "horizontal" }, { animate: true })}
            >
                <div className={css.buttonIcon}>
                    <IconHome />
                </div>
                <div className={css.buttonLabel}>Home</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => push("MapTab", { transitionType: "horizontal" }, { animate: true })}
            >
                <div className={css.buttonIcon}>
                    <IconMenu />
                </div>
                <div className={css.buttonLabel}>Map</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => push("Gift", { transitionType: "horizontal" }, { animate: true })}
            >
                <div className={css.buttonIcon}>
                    <IconSell />
                </div>
                <div className={css.buttonLabel}>Gift</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => push("Chats", { transitionType: "horizontal" }, { animate: true })}
            >
                <div className={css.buttonIcon}>
                    <IconChatting />
                </div>
                <div className={css.buttonLabel}>Chats</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => push("My", { transitionType: "horizontal" }, { animate: true })}
            >
                <div className={css.buttonIcon}>
                    <IconProfile />
                </div>
                <div className={css.buttonLabel}>My</div>
            </button>
        </div>
    );
};

export default BottomTab;
