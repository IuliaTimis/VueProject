<template>
  <div class="breadcrumb-item">
    <span class="breadcrumb-inner" @click="onClick">
      <slot></slot>
    </span>
    <span class="breadcrumb-separator">{{ separator }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
// Assuming a Props type is defined in the same directory
import type { Props } from './BreadcrumbItemProps';

const props = defineProps<Props>();
const { onClick, separator } = toRefs(props);
</script>