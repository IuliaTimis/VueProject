<template>
  <div
    :class="[
      'pagination',
      { 'hide-page-info': hidePageInfo },
      { 'hide-prev-next-buttons': hidePrevNextButtons },
      { 'hide-first-last-buttons': hideFirstLastButtons },
    ]"
  >
    <div
      :class="['decrease-buttons', decreaseButtonsDisabled ? 'disabled' : '']"
    >
      <button
        v-if="!hideFirstLastButtons"
        type="button"
        class="pagination-button go-first-button"
        @click="goFirstButtonClicked"
      >
        &#x2770;&#x2770;
      </button>
      <button
        v-if="!hidePrevNextButtons"
        type="button"
        class="pagination-button go-prev-button"
        @click="goPrevButtonClicked"
      >
        &#x2770;
      </button>
    </div>
    <div
      v-if="!hidePageInfo"
      :class="['input-wrapper', numberOfPages <= 0 ? 'disabled' : '']"
    >
      <input
        v-model.number="inputValue"
        type="number"
        :disabled="numberOfPages <= 0 ? true : false"
        :min="numberOfPages <= 0 ? 0 : 1"
        :max="numberOfPages <= 0 ? 0 : numberOfPages"
        @change="goToSelectedPage"
      />
      <span>/&nbsp;{{ numberOfPages }}</span>
    </div>
    <div
      :class="['increase-buttons', increaseButtonsDisabled ? 'disabled' : '']"
    >
      <button
        v-if="!hidePrevNextButtons"
        type="button"
        class="pagination-button go-next-button"
        @click="goNextButtonClicked"
      >
        &#x2771;
      </button>
      <button
        v-if="!hideFirstLastButtons"
        type="button"
        class="pagination-button go-last-button"
        @click="goLastButtonClicked"
      >
        &#x2771;&#x2771;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
  hidePageInfo: Boolean,
  hidePrevNextButtons: Boolean,
  hideFirstLastButtons: Boolean
})

const emit = defineEmits(['update:currentPage'])

const inputValue = ref(props.currentPage)

const numberOfPages = computed(() => props.totalPages)

const decreaseButtonsDisabled = computed(() => props.currentPage <= 1)
const increaseButtonsDisabled = computed(() => props.currentPage >= props.totalPages)

const goFirstButtonClicked = () => {
  if (!decreaseButtonsDisabled.value) {
    emit('update:currentPage', 1)
  }
}

const goPrevButtonClicked = () => {
  if (!decreaseButtonsDisabled.value) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const goNextButtonClicked = () => {
  if (!increaseButtonsDisabled.value) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const goLastButtonClicked = () => {
  if (!increaseButtonsDisabled.value) {
    emit('update:currentPage', props.totalPages)
  }
}

const goToSelectedPage = () => {
  const newPage = Math.min(Math.max(inputValue.value, 1), props.totalPages)
  if (newPage !== props.currentPage) {
    emit('update:currentPage', newPage)
  }
}

watch(() => props.currentPage, (newVal) => {
  inputValue.value = newVal
})
</script>

<style lang="scss" scoped src="./Pagination.scss" />