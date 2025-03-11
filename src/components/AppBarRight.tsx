import React from "react";

import IconBell from "../assets/IconBell";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import * as AppbarCss from "./Appbar.css";

interface AppBarRightProps {
    distance?: string;
}

const AppBarRight: React.FC<AppBarRightProps> = ({ distance = "3km" }) => (
    <div className={AppbarCss.appBarRight}>
        <div className={AppbarCss.appBarRightTop}>
            <IconSearch />
            <IconSettings />
            <IconBell />
        </div>
        <div className={AppbarCss.appBarRightBottom}>{distance}</div>
    </div>
);

export default AppBarRight;
