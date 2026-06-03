import { defineStore } from "pinia";
import { supabase } from "@/services/supabase";

export const useProductStore = defineStore(
  "products",
  {
    state: () => ({
      products: [],
      loading: false
    }),

    actions: {
      async fetchProducts() {
        this.loading = true;

        const { data, error } =
          await supabase
            .from("products")
            .select("*")
            .order("created_at", {
              ascending: false
            });

        this.loading = false;

        if (error) throw error;

        this.products = data || [];
      },

      async createProduct(payload) {
        const { error } =
          await supabase
            .from("products")
            .insert(payload);

        if (error) throw error;

        await this.fetchProducts();
      },

      async updateProduct(id, payload) {
        const { error } =
          await supabase
            .from("products")
            .update(payload)
            .eq("id", id);

        if (error) throw error;

        await this.fetchProducts();
      },

      async deleteProduct(id) {
        const { error } =
          await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        await this.fetchProducts();
      }
    }
  }
);