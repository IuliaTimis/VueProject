<template>
  <div>
    <BreadcrumbView />
    <DropdownView />
    <PaginationView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BreadcrumbView from './views/BreadcrumbView.vue';
import DropdownView from './views/DropdownView.vue';
import PaginationView from './views/PaginationView.vue';

export default defineComponent({
  components: {
    BreadcrumbView,
    DropdownView,
    PaginationView,
  },
});
</script>