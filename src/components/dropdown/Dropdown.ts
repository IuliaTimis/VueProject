import { Component, Mixins, Prop } from "vue-property-decorator";
import { ElSelect, ElOption } from "element-plus";
import { VNode } from "vue";
import DropdownMixin from "./DropdownMixin"; // Assuming DropdownMixin is from a local file

@Component({
  name: "Dropdown",
  directives: {
    "dropdown-button": {
      bind: (
        el: HTMLElement,
        _binding: Vue.DirectiveBinding,
        vnode: VNode
      ): void => {
        const { icon } = vnode.props!;
        if (!icon) {
          return;
        }
        const suffix = el.querySelector(".el-input--suffix");
        if (suffix) {
          const button = document.createElement("button");
          button.className = "el-button el-button--icon";
          button.innerHTML = `<i class="${icon}"></i>`;
          suffix.appendChild(button);
        }
      },
    },
  },
  components: {
    ElSelect,
    ElOption,
  },
})
export default class Dropdown extends Mixins(DropdownMixin) {
  @Prop({
    required: false,
    default: null,
    type: String,
  })
  icon!: string;
}