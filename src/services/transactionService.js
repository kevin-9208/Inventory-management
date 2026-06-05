import { supabase } from "./supabase";

export const transactionService = {

  async getAll() {

    const { data, error } =
      await supabase
        .from("transactions")
        .select(`
          *,
          products(
            id,
            name,
            sku
          )
        `)
        .order(
          "created_at",
          {
            ascending:false
          }
        );

    if(error) throw error;

    return data;
  },

  async create(payload){

    const {
      data:{ user }
    } =
    await supabase.auth.getUser();

    const { data,error } =
      await supabase
      .from("transactions")
      .insert([
        {
          ...payload,
          created_by:user.id
        }
      ])
      .select()
      .single();

    if(error) throw error;

    return data;
  }
};