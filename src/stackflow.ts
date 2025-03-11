import { vars } from "@seed-design/design-token";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { preloadPlugin } from "@stackflow/plugin-preload";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import dynamic from "next/dynamic";

import { preloadNextPageProps } from "./lib/preloadNextPageProps";
import { pagePropsMap } from "./lib/readPageProps";

const isServer = typeof window === "undefined";

const theme =
    !isServer && /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
        ? "cupertino"
        : "android";

const borderColor =
    theme === "cupertino"
        ? vars.$semantic.color.divider3
        : vars.$semantic.color.divider2;

const activities = ["Main", "Article", "MapTab", "Gift", "Chats", "My", "NotFound"].reduce(
    (acc, name) => {
      acc[name] = dynamic(() => import(`./activities/${name}`), {
        suspense: !isServer,
      });
      return acc;
    },
    {} as Record<string, any>
);
export type TypeActivities = typeof activities;

const routes = {
  Main: "/",
  Article: "/articles/:articleId",
  MapTab: "/MapTab",
  Gift: "/Gift",
  Chats: "/Chats",
  My: "/My",
  NotFound: "/404",
};

const createLoader = (activityName: string, route: string) => ({
                                                                 activityParams,
                                                                 activityContext,
                                                                 initialContext,
                                                                 isInitialActivity,
                                                               }: any) => {
  // Article 액티비티에는 고유한 키를 사용, 그 외에는 Main의 키를 공유
  const key =
      activityName === "Article"
          ? `${activityName}#${JSON.stringify(activityParams)}`
          : "Main";

  if (isInitialActivity) {
    pagePropsMap[key] = {
      _t: "ok",
      pageProps: (initialContext as any).pageProps,
    };
  }

  if (!pagePropsMap[key]) {
    const promise = preloadNextPageProps({
      activityParams,
      route,
      path: (activityContext as any).path,
    }).then((pageProps) => {
      pagePropsMap[key] = {
        _t: "ok",
        pageProps,
      };
    });

    pagePropsMap[key] = {
      _t: "pending",
      promise,
    };
  }

  return { key };
};

const loaders = {
  Main: createLoader("Main", routes.Main),
  Article: createLoader("Article", routes.Article),
  MapTab: createLoader("MapTab", routes.MapTab),
  Gift: createLoader("Gift", routes.Gift),
  Chats: createLoader("Chats", routes.Chats),
  My: createLoader("My", routes.My),
};

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    // AppLayout에서 직접 관리하므로 기본 appBar 설정은 제거합니다.
    basicUIPlugin({
      theme,
      backgroundColor: vars.$semantic.color.paperDefault,
      appBar: {
        borderColor,
        textColor: vars.$scale.color.gray900,
        iconColor: vars.$scale.color.gray900,
      },
    }),
    historySyncPlugin({
      routes,
      fallbackActivity: () => "NotFound",
    }),
    preloadPlugin({
      loaders,
    }),
  ],
});
