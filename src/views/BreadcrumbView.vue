<template>
  <div>
    <p>Breadcrumb:</p>
    <Breadcrumb :breadcrumbs="breadcrumbs" @breadcrumb-back="onBreadcrumbBack" @breadcrumb-click="onBreadcrumbClick" @breadcrumb-clear="onBreadcrumbClear" />
    <ElButton @click="onAddBreadcrumb">Add breadcrumb</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ElButton } from 'element-plus'

const breadcrumbs = ref([
  {
    key: "0",
    title: "breadcrumb 0",
  },
  {
    key: "1",
    title: "breadcrumb 1",
  },
])
let index = ref(2)

function onAddBreadcrumb() {
  breadcrumbs.value.push({
    key: `${index.value}`,
    title: `breadcrumb ${index.value}`,
  })
  index.value++
}

function onBreadcrumbBack() {
  breadcrumbs.value.pop()
}

function onBreadcrumbClick(key: string) {
  const idx = breadcrumbs.value.findIndex(b => b.key === key)
  breadcrumbs.value.splice(idx + 1)
}

function onBreadcrumbClear() {
  if (breadcrumbs.value.length > 0) {
    const lastBreadcrumb = breadcrumbs.value[breadcrumbs.value.length - 1]
    breadcrumbs.value.splice(0, breadcrumbs.value.length, lastBreadcrumb)
  }
}
</script>

<style scoped>
.el-button {
  margin-top: 10px;
}
</style>