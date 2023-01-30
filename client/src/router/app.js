export default [
    {
        path: "/app",
        name: "home",
        component: () => import("@/pages/app/home.vue"),
    },
    {
        path: "/app/scan-success",
        name: "scan-success",
        component: () => import("@/pages/app/success.vue"),
    },
    {
        path: "/app/scan-failed",
        name: "scan-failed",
        component: () => import("@/pages/app/failed.vue"),
    },
];
