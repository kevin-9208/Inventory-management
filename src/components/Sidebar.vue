<template>
  <aside
    class="w-64 bg-slate-900 text-white min-h-screen"
  >
    <div class="p-5 text-xl font-bold">
      Inventory System
    </div>

    <nav class="px-3">
      <RouterLink
        to="/dashboard"
        class="block px-4 py-3 rounded hover:bg-slate-700"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        to="/products"
        class="block px-4 py-3 rounded hover:bg-slate-700"
      >
        Products
      </RouterLink>

      <RouterLink
        to="/transactions"
        class="block px-4 py-3 rounded hover:bg-slate-700"
      >
        Transactions
      </RouterLink>

      <RouterLink
        v-if="isAdmin"
        to="/orders"
        class="block px-4 py-3 rounded hover:bg-slate-700"
      >
        Orders
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const isAdmin = computed(
  () => authStore.role === "admin"
);
</script>