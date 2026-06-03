import { defineStore } from "pinia";
import { supabase } from "@/services/supabase";

export const useAuthStore = defineStore(
  "auth",
  {
    state: () => ({
      user: null,
      session: null,
      loading: false
    }),

    getters: {
      isAuthenticated: (state) =>
        !!state.session,

      role: (state) =>
        state.user?.user_metadata?.role || "",

      isAdmin: (state) =>
        state.user?.user_metadata?.role ===
        "admin",

      isWarehouse: (state) =>
        state.user?.user_metadata?.role ===
        "warehouse"
    },

    actions: {
      async initialize() {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        this.session = session;
        this.user = session?.user || null;

        supabase.auth.onAuthStateChange(
          (_event, session) => {
            this.session = session;
            this.user = session?.user || null;
          }
        );
      },

      async login(email, password) {
        this.loading = true;

        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password
          });

        this.loading = false;

        if (error) throw error;

        this.user = data.user;
        this.session = data.session;

        return data;
      },

      async logout() {
        await supabase.auth.signOut();

        this.user = null;
        this.session = null;
      }
    }
  }
);