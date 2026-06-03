// src/services/productService.js

import { supabase } from "@/services/supabase";

export const productService = {

  async getAll() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) throw error;

    return data;
  },

  async create(product) {

    const { error } = await supabase
      .from("products")
      .insert(product);

    if (error) throw error;
  },

  async update(id, product) {

    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id);

    if (error) throw error;
  },

  async remove(id) {

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
};