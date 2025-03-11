import React from "react";

import IconExpandMore from "../assets/IconExpandMore";
import * as AppbarCss from "./Appbar.css";

interface AppBarLeftProps {
    title?: string;
    subtitle?: string;
}

const AppBarLeft: React.FC<AppBarLeftProps> = ({
                                                   title = "Knock to you",
                                                   subtitle = "T:777 M:300 F:477",
                                               }) => (
    <div className={AppbarCss.appBarLeft}>
        <div className={AppbarCss.appBarLeftTop}>
            <div className={AppbarCss.appBarLeftIcon}>
                <IconExpandMore />
            </div>
            {title}
        </div>
        <div className={AppbarCss.appBarLeftBottom}>{subtitle}</div>
    </div>
);

export default AppBarLeft;
