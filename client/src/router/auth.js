export default [
    {
        path: "/auth/login",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
    },
    {
        path: "/auth/forget_password",
        name: "forget-password",
        component: () => import("@/pages/auth/forget_password.vue"),
    },
];
