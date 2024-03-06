import { defineComponent, PropType, watch, ref, computed, EmitsOptions } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    hidePageInfo: {
      type: Boolean,
      default: false,
    },
    hidePrevNextButtons: {
      type: Boolean,
      default: false,
    },
    hideFirstLastButtons: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['go-to-selected-page', 'go-first-button-clicked', 'go-last-button-clicked', 'go-next-button-clicked', 'go-prev-button-clicked'],
  setup(props, { emit }) {
    const inputValue = ref(0);

    watch(() => props.numberOfPages, checkNumberOfPages, { immediate: true });
    watch(() => props.currentPage, checkNumberOfPages, { immediate: true });

    function checkNumberOfPages() {
      if (props.currentPage > 0 && props.numberOfPages > 0) {
        if (props.currentPage > props.numberOfPages) {
          inputValue.value = props.numberOfPages;
        } else if (props.currentPage <= 0) {
          inputValue.value = 1;
        } else {
          inputValue.value = props.currentPage;
        }
      } else {
        inputValue.value = 0;
      }
    }

    function goToSelectedPage() {
      if (inputValue.value > props.numberOfPages) {
        emit('go-to-selected-page', props.numberOfPages);
        inputValue.value = props.numberOfPages;
      } else if (inputValue.value < 1) {
        emit('go-to-selected-page', 1);
        inputValue.value = 1;
      } else {
        emit('go-to-selected-page', inputValue.value);
      }
    }

    function goFirstButtonClicked() {
      emit('go-first-button-clicked');
    }

    function goLastButtonClicked() {
      emit('go-last-button-clicked');
    }

    function goNextButtonClicked() {
      emit('go-next-button-clicked');
    }

    function goPrevButtonClicked() {
      emit('go-prev-button-clicked');
    }

    const increaseButtonsDisabled = computed(() => {
      return props.currentPage === props.numberOfPages || props.numberOfPages <= 0;
    });

    const decreaseButtonsDisabled = computed(() => {
      return props.currentPage === 1 || props.numberOfPages <= 0;
    });

    return {
      inputValue,
      goToSelectedPage,
      goFirstButtonClicked,
      goLastButtonClicked,
      goNextButtonClicked,
      goPrevButtonClicked,
      increaseButtonsDisabled,
      decreaseButtonsDisabled,
    };
  },
});