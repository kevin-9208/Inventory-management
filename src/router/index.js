import { createRouter, createWebHistory } from "vue-router";

import { supabase } from "@/services/supabase";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Products from "@/pages/Products.vue";
import Transactions from "@/pages/Transactions.vue";
import Orders from "@/pages/Orders.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },

  {
    path: "/",
    redirect: "/dashboard"
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: "/products",
    name: "products",
    component: Products,
    meta: { requiresAuth: true }
  },

  {
    path: "/transactions",
    name: "transactions",
    component: Transactions,
    meta: { requiresAuth: true }
  },

  {
    path: "/orders",
    name: "orders",
    component: Orders,
    meta: {
      requiresAuth: true,
      adminOnly: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    return next("/login");
  }

  if (to.meta.adminOnly) {
    const role =
      session?.user?.user_metadata?.role;

    if (role !== "admin") {
      return next("/dashboard");
    }
  }

  next();
});

export default router;