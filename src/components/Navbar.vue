<template>
  <header
    class="bg-white shadow px-6 py-4 flex justify-between"
  >
    <div>
      <h1 class="font-bold text-lg">
        Inventory Management
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <span>
        {{ authStore.user?.email }}
      </span>

      <button
        @click="logout"
        class="btn-danger"
      >
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