<template>
  <MainLayout>

    <div class="space-y-6">

      <div class="flex justify-between">

        <h2 class="text-xl font-semibold text-slate-800">
          Transactions
        </h2>

        <button @click="showModal = true"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-lg shadow-sm transition-colors duration-150">
          New Transaction
        </button>

      </div>

      <TransactionForm v-if="showModal" @close="showModal = false" @saved="load" />

      <TransactionTable :transactions="transactions" />

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";

import MainLayout
  from "@/layouts/MainLayout.vue";

import TransactionForm
  from "@/components/TransactionForm.vue";

import TransactionTable
  from "@/components/TransactionTable.vue";

import { transactionService }
  from "@/services/transactionService";

const transactions = ref([]);

const showModal = ref(false);

async function load() {

  transactions.value =
    await transactionService.getAll();

  showModal.value = false;
}

onMounted(load);
</script>