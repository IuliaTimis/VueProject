<template>
  <div>
    <p>Pagination:</p>
    <PaginationComponent
      :current-page="currentPage"
      :number-of-pages="numberOfPages"
      @go-prev-button-click="onGoPrevButtonClick"
      @go-next-button-click="onGoNextButtonClick"
      @go-first-button-click="onGoFirstButtonClick"
      @go-last-button-click="onGoLastButtonClick"
      @go-to-selected-page="onGoToSelectedPage"
    ></PaginationComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PaginationComponent from "../components/pagination/Pagination.vue";

export default defineComponent({
  components: {
    PaginationComponent,
  },
  setup() {
    const currentPage = ref(1);
    const numberOfPages = ref(10);

    const onGoPrevButtonClick = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const onGoNextButtonClick = () => {
      if (currentPage.value < numberOfPages.value) {
        currentPage.value++;
      }
    };
    const onGoFirstButtonClick = () => {
      currentPage.value = 1;
    };
    const onGoLastButtonClick = () => {
      currentPage.value = numberOfPages.value;
    };
    const onGoToSelectedPage = (page: number) => {
      currentPage.value = page;
    };

    return {
      currentPage,
      numberOfPages,
      onGoPrevButtonClick,
      onGoNextButtonClick,
      onGoFirstButtonClick,
      onGoLastButtonClick,
      onGoToSelectedPage,
    };
  },
});
</script>