export default [
    {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () => import("@/pages/admin/dashboard.vue"),
    },
    {
        path: "/admin/users",
        name: "user-management",
        component: () => import("@/pages/admin/users.vue"),
    },
    {
        path: "/admin/patrols",
        name: "patrol-management",
        component: () => import("@/pages/admin/patrols.vue"),
    },
];
