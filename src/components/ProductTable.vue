<template>

  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
    <table class="w-full text-sm">

      <thead>

        <tr class="bg-slate-50 border-b border-slate-200">
          <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
          <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
          <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
          <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reorder</th>
          <th class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
          <th class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
         </tr>

      </thead>

      <tbody>

        <tr
          v-for="item in products"
          :key="item.id"
          class="border-b border-slate-100 hover:bg-slate-50/70 transition-colors duration-100"
        >

          <td class="px-5 py-3.5 font-medium text-slate-800">{{ item.name }}</td>
          <td class="px-5 py-3.5 text-slate-400 font-mono text-xs">{{ item.sku }}</td>
          <td class="px-5 py-3.5 text-center">

            <span
              v-if="!isWarehouse"
              :class="[
                'inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded-full text-xs font-semibold',
                item.quantity <= item.reorder_level
                  ? 'bg-red-50 text-red-600'
                  : 'bg-emerald-50 text-emerald-700'
              ]"
            >
              {{ item.quantity }}
            </span>

            <input
              v-else
              type="number"
              :value="item.quantity"
              class="border border-slate-200 rounded-lg px-2 py-1 w-20 text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
              @change="updateQty(
                item,
                $event.target.value
              )"
            />

          </td>

          <td class="px-5 py-3.5 text-center text-slate-500">{{ item.reorder_level }}</td>
          <td class="px-5 py-3.5 text-right font-medium text-slate-700">¥{{ item.unit_price?.toLocaleString() }}</td>
          <td class="px-5 py-3.5 text-right">
            <div class="flex gap-1.5 justify-end">

              <button
                v-if="isAdmin"
                @click="$emit(
                  'edit',
                  item
                )"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors duration-150"
              >
                Edit
              </button>

              <button
                v-if="isAdmin"
                @click="$emit(
                  'delete',
                  item
                )"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-150"
              >
                Delete
              </button>

            </div>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

</template>

<script setup>

import { useRole } from "@/composables/useRole";

const props =
  defineProps({
    products: Array
  });

const emit =
  defineEmits([
    "edit",
    "delete",
    "update-stock"
  ]);

const {
  isAdmin,
  isWarehouse
} = useRole();

function updateQty(
  product,
  value
) {

  emit(
    "update-stock",
    {
      product,
      quantity:
        Number(value)
    }
  );
}

</script>