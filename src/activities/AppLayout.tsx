// AppLayout.tsx
import { AppScreen } from "@stackflow/plugin-basic-ui";
import React from "react";

import AppBarLeft from "../components/AppBarLeft";
import AppBarRight from "../components/AppBarRight";
import BottomTab from "../components/BottomTab";
import * as css from "./AppLayout.css"; // 공통 스타일 파일 (wrapper, scrollable, bottom)

interface AppLayoutProps {
    children: React.ReactNode;
    renderAppBarLeft?: () => React.ReactNode;
    renderAppBarRight?: () => React.ReactNode;
}

const defaultAppBarLeft = () => <AppBarLeft />;
const defaultAppBarRight = () => <AppBarRight />;

const AppLayout: React.FC<AppLayoutProps> = ({
                                                 children,
                                                 renderAppBarLeft,
                                                 renderAppBarRight,
                                             }) => (
    <AppScreen
        appBar={{
            renderLeft: renderAppBarLeft || defaultAppBarLeft,
            renderRight: renderAppBarRight || defaultAppBarRight,
        }}
    >
        <div className={css.wrapper}>
            <div className={css.scrollable}>{children}</div>
            <div className={css.bottom}>
                <BottomTab />
            </div>
        </div>
    </AppScreen>
);

export default AppLayout;
