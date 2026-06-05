<template>

  <div class="bg-white rounded-xl border border-slate-200 p-6">
    <div class="flex items-center gap-2 mb-5">
      <div class="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" v-if="!editMode"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" v-else/>
        </svg>
      </div>
      <h3 class="text-base font-semibold text-slate-800">
        {{ editMode ? 'Edit Product' : 'Add Product' }}
      </h3>
    </div>

    <form @submit.prevent="submit" class="grid grid-cols-2 gap-4">
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-xs font-medium text-slate-500 mb-1.5">Product Name</label>
        <input v-model="form.name" placeholder="e.g. MacBook Pro 16" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors" />
      </div>
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-xs font-medium text-slate-500 mb-1.5">SKU</label>
        <input v-model="form.sku" readonly class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-400 bg-slate-50 font-mono cursor-not-allowed" />
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-500 mb-1.5">Quantity</label>
        <input v-model.number="form.quantity" type="number" placeholder="0" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors" />
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-500 mb-1.5">Reorder Level</label>
        <input v-model.number="form.reorder_level" type="number" placeholder="10" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors" />
      </div>
      <div class="col-span-2">
        <label class="block text-xs font-medium text-slate-500 mb-1.5">Unit Price (¥)</label>
        <input v-model.number="form.unit_price" type="number" placeholder="0.00" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors" />
      </div>
      <div class="col-span-2 flex gap-2 pt-1">
        <button class="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-lg transition-colors duration-150">Save</button>

        <button
          type="button"
          @click="$emit('cancel')"
          class="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150"
        >
          Cancel
        </button>

      </div>

    </form>

  </div>

</template>

<script setup>

import { reactive, watch } from "vue";

import { generateSKU } from "@/utils/skuGenerator";

const props = defineProps({
  product: Object
});

const emit = defineEmits([
  "save",
  "cancel"
]);

const form = reactive({
  name: "",
  sku: generateSKU(),
  quantity: 0,
  reorder_level: 10,
  unit_price: 0
});

const editMode =
  !!props.product;

watch(
  () => props.product,
  (value) => {

    if (!value) return;

    Object.assign(
      form,
      value
    );
  },
  {
    immediate: true
  }
);

function submit() {

  emit(
    "save",
    {
      ...form
    }
  );
}

</script>