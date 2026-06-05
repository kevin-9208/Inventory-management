<template>
  <aside
    class="w-60 bg-[#0f1623] text-white min-h-screen flex flex-col border-r border-white/5"
  >
    <div class="px-6 py-6 border-b border-white/10">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
        </div>
        <span class="text-sm font-semibold tracking-wide text-white">Inventory System</span>
      </div>
    </div>

    <nav class="px-3 py-4 flex-1 space-y-0.5">
      <p class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Menu</p>
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150 router-link-active:bg-indigo-500/20 router-link-active:text-indigo-300"
      >
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </RouterLink>

      <RouterLink
        to="/products"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150 router-link-active:bg-indigo-500/20 router-link-active:text-indigo-300"
      >
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
        Products
      </RouterLink>

      <RouterLink
        to="/transactions"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150 router-link-active:bg-indigo-500/20 router-link-active:text-indigo-300"
      >
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Transactions
      </RouterLink>

      <RouterLink
        v-if="isAdmin"
        to="/orders"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150 router-link-active:bg-indigo-500/20 router-link-active:text-indigo-300"
      >
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Orders
      </RouterLink>
    </nav>
    <div class="px-6 py-4 border-t border-white/10">
      <p class="text-[11px] text-slate-600">v1.0.0</p>
    </div>
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