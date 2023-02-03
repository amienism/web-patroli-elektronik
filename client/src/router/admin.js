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
        path: "/admin/location",
        name: "lcoation-management",
        component: () => import("@/pages/admin/location.vue"),
    },
    {
        path: "/admin/patrol",
        name: "patrol-management",
        component: () => import("@/pages/admin/patrol.vue"),
    },
];
