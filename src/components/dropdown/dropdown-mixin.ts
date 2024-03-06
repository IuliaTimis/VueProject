import {
  defineComponent,
  ref,
  PropType,
  toRefs,
  watch,
  computed,
  onMounted,
} from "vue";

export type DropdownOption = {
  label?: string;
  value?: unknown;
  disabled?: boolean;
  hide?: boolean;
  [key: string]: unknown;
};

export default defineComponent({
  name: "dropdown-mixin",
  props: {
    searchInput: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: "Search",
    },
    searchProperty: {
      type: String,
      default: "label",
    },
    placement: {
      type: String,
      default: "",
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array as PropType<DropdownOption[]>,
      default: () => [],
    },
    popperClass: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    preselectedValue: {
      type: [String, Number, Object] as PropType<string | number | Record<string, unknown> | null>,
      default: null,
    },
    value: {
      required: true,
    },
  },

  setup(props) {
    const { options, searchProperty, value, placement } = toRefs(props);
    const searchValue = ref("");
    const innerValue = ref(value.value);
    const selectRef = ref<HTMLElement | null>(null);

    const visibleOptions = computed(() => {
      if (!searchValue.value) {
        return options.value;
      }
      const results = options.value.filter((item: DropdownOption) =>
        String(item[searchProperty.value])
          .toLowerCase()
          .includes(searchValue.value.toLowerCase())
      );

      return results.length ? results : [{ hide: true }];
    });

    const popperRef = computed(() => {
      return selectRef.value?.$refs?.popper as HTMLElement | undefined;
    });

    const currentPlacement = ref(props.placement);

    const handleClearSelection = () => {
      searchValue.value = "";
    };

    watch(value, (newVal) => {
      if (newVal !== undefined) {
        innerValue.value = newVal;
      }
    }, { immediate: true });

    watch(currentPlacement, (newPlacement) => {
      // Assuming this is where you want to handle updated logic for placement
      // This is a placeholder for where you'd include your logic.
    }, { immediate: true });

    onMounted(() => {
      if (props.preselectedValue) {
        innerValue.value = props.preselectedValue;
      }
    });

    return {
      searchValue,
      innerValue,
      visibleOptions,
      handleClearSelection,
      selectRef,
      popperRef, // Added popperRef to the returned object.
      currentPlacement, // Added currentPlacement to the returned object.
    };
  },
});