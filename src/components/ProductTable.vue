<template>

  <div class="card">

    <table
      class="w-full"
    >

      <thead>

        <tr class="border-b">

          <th>Name</th>
          <th>SKU</th>
          <th>Stock</th>
          <th>Reorder</th>
          <th>Price</th>
          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        <tr
          v-for="item in products"
          :key="item.id"
          class="border-b"
        >

          <td>{{ item.name }}</td>

          <td>{{ item.sku }}</td>

          <td>

            <span
              v-if="!isWarehouse"
            >
              {{ item.quantity }}
            </span>

            <input
              v-else
              type="number"
              :value="item.quantity"
              class="border rounded px-2 py-1 w-24"
              @change="updateQty(
                item,
                $event.target.value
              )"
            />

          </td>

          <td>
            {{ item.reorder_level }}
          </td>

          <td>
            ¥{{ item.unit_price }}
          </td>

          <td>

            <div
              class="flex gap-2"
            >

              <button
                v-if="isAdmin"
                @click="$emit(
                  'edit',
                  item
                )"
                class="btn-primary"
              >
                Edit
              </button>

              <button
                v-if="isAdmin"
                @click="$emit(
                  'delete',
                  item
                )"
                class="btn-danger"
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