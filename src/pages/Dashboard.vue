<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-slate-800">Dashboard</h2>
          <p class="text-sm text-slate-500 mt-0.5">Welcome back, {{ authStore.user?.email }}</p>
         </div>
      </div>
 
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Products</span>
            <div class="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-slate-800">{{ productStore.products.length }}</p>
          <p class="text-xs text-slate-400 mt-1">Active items</p>
         </div>
 
        <div class="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Low Stock</span>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="lowStockCount > 0 ? 'bg-amber-50' : 'bg-emerald-50'">
              <svg class="w-4 h-4" :class="lowStockCount > 0 ? 'text-amber-500' : 'text-emerald-500'"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold" :class="lowStockCount > 0 ? 'text-amber-600' : 'text-slate-800'">
            {{ lowStockCount }}
          </p>
          <p class="text-xs text-slate-400 mt-1">Below reorder level</p>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">User Role</span>
            <div class="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p class="text-xl font-bold text-slate-800 capitalize">{{ authStore.role }}</p>
          <p class="text-xs text-slate-400 mt-1">Current session</p>
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