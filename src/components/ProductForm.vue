<template>

  <div class="card">

    <h3 class="text-xl font-bold mb-4">

      {{ editMode ? 'Edit Product' : 'Add Product' }}

    </h3>

    <form
      @submit.prevent="submit"
      class="space-y-4"
    >

      <input
        v-model="form.name"
        placeholder="Product Name"
        class="border p-2 w-full rounded"
      />

      <input
        v-model="form.sku"
        readonly
        class="border p-2 w-full rounded bg-gray-100"
      />

      <input
        v-model.number="form.quantity"
        type="number"
        placeholder="Quantity"
        class="border p-2 w-full rounded"
      />

      <input
        v-model.number="form.reorder_level"
        type="number"
        placeholder="Reorder Level"
        class="border p-2 w-full rounded"
      />

      <input
        v-model.number="form.unit_price"
        type="number"
        placeholder="Unit Price"
        class="border p-2 w-full rounded"
      />

      <div class="flex gap-2">

        <button
          class="btn-primary"
        >
          Save
        </button>

        <button
          type="button"
          @click="$emit('cancel')"
          class="btn-danger"
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