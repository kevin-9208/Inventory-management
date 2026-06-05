<template>
    <div class="bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex items-center gap-2 mb-5">
            <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
            <h3 class="text-base font-semibold text-slate-800">New Transaction</h3>
        </div>

        <form @submit.prevent="submit" class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
                <label class="block text-xs font-medium text-slate-500 mb-1.5">Product</label>
                <select v-model="form.product_id" required
                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white transition-colors">
                    <option value="">Select Product</option>
                    <option v-for="p in products" :key="p.id" :value="p.id">
                        {{ p.name }} ({{ p.quantity }} in stock)
                    </option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-500 mb-1.5">Type</label>
                <select v-model="form.type" required
                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white transition-colors"
                    :class="form.type === 'IN' ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'">
                    <option value="IN">IN — Stock In</option>
                    <option value="OUT">OUT — Stock Out</option>
                </select>
             </div>
            <div>
                <label class="block text-xs font-medium text-slate-500 mb-1.5">Quantity</label>
                <input v-model.number="form.quantity" type="number" min="1"
                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors" />
            </div>
            <div class="col-span-2">
                <label class="block text-xs font-medium text-slate-500 mb-1.5">Note <span class="text-slate-300">(optional)</span></label>
                <textarea v-model="form.note" rows="2"
                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 resize-none transition-colors" />
            </div>
            <div class="col-span-2 flex gap-2 pt-1">
                <button type="submit"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-lg transition-colors duration-150">Save</button>
                <button type="button" @click="$emit('close')"
                    class="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150">Cancel</button>
            </div>

        </form>

    </div>
</template>

<script setup>
import {
    ref,
    onMounted
} from "vue";

import {
    productService
}
    from "@/services/productService";

import {
    transactionService
}
    from "@/services/transactionService";

const emit =
    defineEmits([
        "saved",
        "close"
    ]);

const products =
    ref([]);

const form =
    ref({
        product_id: "",
        type: "IN",
        quantity: 1,
        note: ""
    });

async function loadProducts() {

    products.value =
        await productService.getAll();
}

async function submit() {

    try {

        await transactionService.create(
            form.value
        );

        emit("saved");

    } catch (err) {

        alert(err.message);
    }

}

onMounted(loadProducts);
</script>