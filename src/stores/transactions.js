import { defineStore } from "pinia";
import { supabase } from "@/services/supabase";

export const useTransactionStore =
  defineStore("transactions", {
    state: () => ({
      transactions: [],
      loading: false
    }),

    actions: {
      async fetchTransactions() {
        this.loading = true;

        const { data, error } =
          await supabase
            .from("transactions")
            .select(`
              *,
              products(
                name,
                sku
              )
            `)
            .order("created_at", {
              ascending: false
            });

        this.loading = false;

        if (error) throw error;

        this.transactions = data || [];
      },

      async createTransaction(payload) {
        const { error } =
          await supabase
            .from("transactions")
            .insert(payload);

        if (error) throw error;

        await this.fetchTransactions();
      }
    }
  });