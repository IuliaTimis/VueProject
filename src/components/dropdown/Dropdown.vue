<template>
  <el-select
    ref="selectRef"
    v-model="innerValue"
    :class="[{ active }, 'dropdown']"
    :popper-class="`dropdown-popper ${popperClass}`"
    :placement="placement"
    :popper-append-to-body="popperAppendToBody"
    :icon="icon"
    v-bind="$attrs"
    v-on="$listeners"
    :placeholder="searchPlaceholder"
  >
    <el-option
      v-for="(item, index) in visibleOptions"
      :key="index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
      :class="{ hide: item.hide }"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped src="./Dropdown.scss"></style>
<style lang="scss" src="./Dropdown.nomodule.scss"></style>
<script lang="ts" src="./Dropdown.ts"></script>
NO_UPDATE_REQUIRED