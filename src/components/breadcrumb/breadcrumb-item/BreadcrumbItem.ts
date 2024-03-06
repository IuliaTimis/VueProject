import { defineComponent, PropType } from 'vue';
import BreadcrumbEntry from "../BreadcrumbEntry";

export default defineComponent({
  name: "BreadcrumbItem",
  props: {
    item: {
      type: Object as PropType<BreadcrumbEntry>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const separator = " / ";

    function onClick($event: Event): void {
      emit("breadcrumb-click", props.item?.key ?? $event);
    }

    return { separator, onClick };
  }
});