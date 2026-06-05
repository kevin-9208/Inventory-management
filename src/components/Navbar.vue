<template>
  <header
    class="bg-white border-b border-slate-200 px-6 py-0 h-14 flex items-center justify-between"
  >
    <div class="flex items-center gap-2">
      <h1 class="font-semibold text-sm text-slate-700 tracking-wide">
        Inventory Management
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold uppercase">
          {{ authStore.user?.email?.charAt(0) }}
        </div>
        <span class="text-sm text-slate-600 hidden sm:block">
          {{ authStore.user?.email }}
        </span>
      </div>

      <button
        @click="logout"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md transition-colors duration-150"
      >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();

async function logout() {
  await authStore.logout();

  router.push("/login");
}
</script>