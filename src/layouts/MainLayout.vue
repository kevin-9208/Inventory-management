<template>

  <div class="min-h-screen flex">

    <Sidebar />

    <div class="flex-1">

      <Navbar />

      <main class="p-6">
        <slot />
      </main>

    </div>

  </div>

</template>

<script setup>

import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

</script>