<template>
  <MainLayout>
    <div>
      <h2
        class="text-2xl font-bold mb-6"
      >
        Dashboard
      </h2>

      <div
        class="grid grid-cols-3 gap-4"
      >
        <div class="card">
          <h3>Total Products</h3>

          <p class="text-3xl font-bold">
            {{ productStore.products.length }}
          </p>
        </div>

        <div class="card">
          <h3>Low Stock</h3>

          <p class="text-3xl font-bold">
            {{ lowStockCount }}
          </p>
        </div>

        <div class="card">
          <h3>User Role</h3>

          <p class="text-xl">
            {{ authStore.role }}
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed, onMounted } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";

import { useAuthStore } from "@/stores/auth";

import { useProductStore } from "@/stores/products";

const authStore = useAuthStore();

const productStore =
  useProductStore();

const lowStockCount = computed(() =>
  productStore.products.filter(
    p => p.quantity < p.reorder_level
  ).length
);

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>