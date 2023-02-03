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
    {
        path: "/app/scanner",
        name: "scanner",
        component: () => import("@/pages/app/scanner.vue"),
    },
    {
        path: "/scan/:qr_code_path",
        name: "scan-qr",
        component: () => import("@/pages/scan/scan.vue"),
    },
];
