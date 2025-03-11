import { useActions, useActivity } from "@stackflow/react";
import React from "react";

import IconChatting from "../assets/IconChatting";
import IconHome from "../assets/IconHome";
import IconMenu from "../assets/IconMenu";
import IconProfile from "../assets/IconProfile";
import IconSell from "../assets/IconSell";
import * as css from "./BottomTab.css";

const BottomTab: React.FC = () => {
    const { push, replace } = useActions();
    const { name: currentActivity } = useActivity(); // 현재 활성화된 액티비티 이름 가져오기

    const handlePush = (activityName: string) => {
        if (currentActivity !== activityName) {
            push(activityName, {}, { animate: true });
        }
    };

    const handleReplace = (activityName: string) => {
        if (currentActivity !== activityName) {
            replace(activityName, {}, { animate: true });
        }
    };

    return (
        <div className={css.container}>
            <button
                type="button"
                className={css.button}
                onClick={() => handleReplace("Main")}
            >
                <div className={css.buttonIcon}>
                    <IconHome />
                </div>
                <div className={css.buttonLabel}>Home</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => handleReplace("MapTab")}
            >
                <div className={css.buttonIcon}>
                    <IconMenu />
                </div>
                <div className={css.buttonLabel}>Map</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => handlePush("Gift")}
            >
                <div className={css.buttonIcon}>
                    <IconSell />
                </div>
                <div className={css.buttonLabel}>Gift</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => handleReplace("Chats")}
            >
                <div className={css.buttonIcon}>
                    <IconChatting />
                </div>
                <div className={css.buttonLabel}>Chats</div>
            </button>

            <button
                type="button"
                className={css.button}
                onClick={() => handleReplace("My")}
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
