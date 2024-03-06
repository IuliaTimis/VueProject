<template>
  <div class="breadcrumb">
    <el-button v-if="!isTitleOnly.value" class="breadcrumb-button" @click="breadcrumbBack">
      <span>&#x2770;</span>
    </el-button>
    <div class="breadcrumb-items">
      <slot>
        <breadcrumb-item
          v-for="(item, index) in itemsToRender.value"
          :key="item.key"
          :item="item"
          :class="[
            'breadcrumb-item',
            { titleOnly: isTitleOnly.value },
            { 'last-breadcrumb-item': index === itemsToRender.value.length - 1 },
          ]"
          v-bind="$attrs"
        >
          <el-tooltip v-if="isTruncated.value && index !== 0 && index !== itemsToRender.value.length - 1" :content="item.title">
            <span>{{ item.title }}</span>
          </el-tooltip>
          <span v-else>{{ item.title }}</span>
        </breadcrumb-item>
      </slot>
    </div>
    <div v-if="showClearButton.value && itemsToRender.value.length > 1" class="hide-breadcrumb-wrapper">
      <span @click="breadcrumbClear">&#10006;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { breadcrumbBack, breadcrumbClear } from './Breadcrumb.ts';

const props = defineProps({
  isTitleOnly: Boolean,
  isTruncated: Boolean,
  showClearButton: Boolean,
  itemsToRender: {
    type: Array,
    default: () => [],
  },
});
const { isTitleOnly, isTruncated, showClearButton, itemsToRender } = toRefs(props);

</script>

<style lang="scss" scoped src="./Breadcrumb.scss" />