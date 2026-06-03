<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">
          Products
        </h2>

        <button
          v-if="isAdmin"
          @click="openCreate"
          class="btn-success"
        >
          Add Product
        </button>
      </div>

      <ProductForm
        v-if="showForm"
        :product="editingProduct"
        @save="save"
        @cancel="closeForm"
      />

      <ProductTable
        :products="products"
        @edit="edit"
        @delete="remove"
        @update-stock="updateStock"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted
} from "vue";

import MainLayout from "@/layouts/MainLayout.vue";

import ProductForm from "@/components/ProductForm.vue";
import ProductTable from "@/components/ProductTable.vue";

import { productService } from "@/services/productService";
import { useRole } from "@/composables/useRole";
import { supabase } from "@/services/supabase";

const { isAdmin } = useRole();

const products = ref([]);

const showForm = ref(false);

const editingProduct = ref(null);

let realtimeChannel = null;

/**
 * 加载产品
 */
async function loadProducts() {
  try {
    const data =
      await productService.getAll();

    console.log("Products Data:", data);

    products.value = data || [];

  } catch (error) {

    console.error(
      "Load Products Error:",
      error
    );
  }
}

/**
 * 新增
 */
function openCreate() {

  editingProduct.value = null;

  showForm.value = true;
}

/**
 * 编辑
 */
function edit(product) {

  editingProduct.value = product;

  showForm.value = true;
}

/**
 * 关闭表单
 */
function closeForm() {

  showForm.value = false;

  editingProduct.value = null;
}

/**
 * 保存
 */
async function save(product) {

  try {

    if (
      editingProduct.value
    ) {

      await productService.update(
        editingProduct.value.id,
        product
      );

    } else {

      await productService.create(
        product
      );
    }

    closeForm();

    await loadProducts();

  } catch (error) {

    console.error(
      "Save Product Error:",
      error
    );

    alert(
      error.message
    );
  }
}

/**
 * 删除
 */
async function remove(product) {

  const confirmed =
    confirm(
      `Delete "${product.name}" ?`
    );

  if (!confirmed) return;

  try {

    await productService.remove(
      product.id
    );

    await loadProducts();

  } catch (error) {

    console.error(
      "Delete Product Error:",
      error
    );

    alert(
      error.message
    );
  }
}

/**
 * 仓库修改库存
 */
async function updateStock(
  payload
) {

  try {

    await productService.update(
      payload.product.id,
      {
        quantity:
          payload.quantity
      }
    );

  } catch (error) {

    console.error(
      "Update Stock Error:",
      error
    );

    alert(
      error.message
    );
  }
}

/**
 * 页面加载
 */
onMounted(async () => {

  await loadProducts();

  if (
    realtimeChannel
  ) {
    return;
  }

  realtimeChannel =
    supabase
      .channel(
        "products-realtime"
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products"
        },
        async (payload) => {

          console.log(
            "Realtime Event:",
            payload
          );

          await loadProducts();
        }
      );

  realtimeChannel.subscribe(
    (status) => {

      console.log(
        "Realtime Status:",
        status
      );
    }
  );
});

/**
 * 页面销毁
 */
onUnmounted(async () => {

  if (
    realtimeChannel
  ) {

    await supabase.removeChannel(
      realtimeChannel
    );

    realtimeChannel = null;
  }
});
</script>