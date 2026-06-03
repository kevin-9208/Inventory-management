import { computed } from "vue";

import { useAuthStore } from "@/stores/auth";

export function useRole() {
  const authStore = useAuthStore();

  const role = computed(
    () => authStore.role
  );

  const isAdmin = computed(
    () => authStore.isAdmin
  );

  const isWarehouse = computed(
    () => authStore.isWarehouse
  );

  return {
    role,
    isAdmin,
    isWarehouse
  };
}