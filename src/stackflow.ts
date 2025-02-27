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

const activities = {
  Main: dynamic(() => import("./activities/Main"), {
    suspense: !isServer,
  }),
  Article: dynamic(() => import("./activities/Article"), {
    suspense: !isServer,
  }),
  MapTab: dynamic(() => import("./activities/MapTab"), {
    suspense: !isServer,
  }),
  Gift: dynamic(() => import("./activities/Gift"), {
    suspense: !isServer,
  }),
  Chats: dynamic(() => import("./activities/Chats"), {
    suspense: !isServer,
  }),
  My: dynamic(() => import("./activities/My"), {
    suspense: !isServer,
  }),
  NotFound: dynamic(() => import("./activities/NotFound"), {
    suspense: !isServer,
  }),
};
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

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
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
      loaders: {
        Main({
               activityParams,
               activityContext,
               initialContext,
               isInitialActivity,
             }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Main,
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

          return {
            key,
          };
        },
        Article({
                  activityParams,
                  activityContext,
                  initialContext,
                  isInitialActivity,
                }) {
          const key = `Article#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Article,
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

          return {
            key,
          };
        },
        MapTab({
                 activityParams,
                 activityContext,
                 initialContext,
                 isInitialActivity,
               }) {
          const key = `MapTab#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.MapTab,
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
        },
        Gift({
               activityParams,
               activityContext,
               initialContext,
               isInitialActivity,
             }) {
          const key = `Gift#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Gift,
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
        },
        Chats({
                activityParams,
                activityContext,
                initialContext,
                isInitialActivity,
              }) {
          const key = `Chats#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Chats,
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
        },
        My({
             activityParams,
             activityContext,
             initialContext,
             isInitialActivity,
           }) {
          const key = `My#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initialContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.My,
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
        },
      },
    }),
  ],
});
