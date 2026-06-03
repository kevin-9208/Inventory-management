import { computed } from "vue";

import { useAuthStore } from "@/stores/auth";

export function useAuth() {
  const authStore = useAuthStore();

  const user = computed(
    () => authStore.user
  );

  const session = computed(
    () => authStore.session
  );

  const isAuthenticated = computed(
    () => authStore.isAuthenticated
  );

  const login = authStore.login;
  const logout = authStore.logout;

  return {
    user,
    session,
    isAuthenticated,
    login,
    logout
  };
}