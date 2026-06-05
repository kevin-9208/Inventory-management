<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50"
  >
    <div
      class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 w-[400px]"
    >
      <div class="flex flex-col items-center mb-8">
        <div class="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">Inventory System</h2>
        <p class="text-sm text-slate-400 mt-1">Sign in to your account</p>
      </div>

      <form @submit.prevent="submit">
        <div class="mb-4 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
          />
        </div>

        <div class="mb-6 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</label>

          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
          />
        </div>

        <button
          class="w-full py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-lg shadow-sm transition-colors duration-150"
        >
          Login
        </button>
      </form>

      <p
        v-if="errorMessage"
        class="flex items-center gap-2 text-red-600 text-sm mt-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5"
      >
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const errorMessage = ref("");

async function submit() {
  try {
    errorMessage.value = "";

    await authStore.login(
      email.value,
      password.value
    );

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value =
      error.message;
  }
}
</script>