<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-100"
  >
    <div
      class="bg-white p-8 rounded shadow w-[400px]"
    >
      <h2
        class="text-2xl font-bold mb-6 text-center"
      >
        Login
      </h2>

      <form @submit.prevent="submit">
        <div class="mb-4">
          <label>Email</label>

          <input
            v-model="email"
            type="email"
            class="w-full border p-2 rounded"
          />
        </div>

        <div class="mb-4">
          <label>Password</label>

          <input
            v-model="password"
            type="password"
            class="w-full border p-2 rounded"
          />
        </div>

        <button
          class="btn-primary w-full"
        >
          Login
        </button>
      </form>

      <p
        v-if="errorMessage"
        class="text-red-500 mt-4"
      >
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