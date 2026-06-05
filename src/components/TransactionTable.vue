<template>
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table class="table-auto w-full text-sm">

            <thead>

                <tr class="bg-slate-50 border-b border-slate-200">
                    <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID
                    </th>
                    <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Product</th>
                    <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type
                    </th>
                    <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty
                    </th>
                    <th class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr v-for="item in transactions" :key="item.id"
                    class="border-b border-slate-100 hover:bg-slate-50/70 transition-colors duration-100">

                    <td class="px-5 py-3.5 font-mono text-xs text-slate-400">{{ item.id.slice(0, 8) }}…</td>
                    <td class="px-5 py-3.5 font-medium text-slate-700">{{ item.products?.name }}</td>
                    <td class="px-5 py-3.5 text-center">
                        <span :class="[
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
                            item.type === 'IN'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-600'
                        ]">
                            {{ item.type }}
                        </span>
                    </td>
                    <td class="px-5 py-3.5 text-center text-slate-600">{{ item.quantity }}</td>
                    <td class="px-5 py-3.5 text-right text-slate-400 text-xs">{{ new
                        Date(item.created_at).toLocaleString() }}</td>

                </tr>

            </tbody>

        </table>

    </div>
</template>

<script setup>
defineProps({
    transactions: Array
});
</script>