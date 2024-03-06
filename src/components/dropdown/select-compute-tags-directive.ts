import { nextTick, type DirectiveBinding, type ObjectDirective, type VNode } from "vue";

const recomputeTags = async (
  element: HTMLElement,
  binding: DirectiveBinding,
  vnode: VNode
): Promise<void> => {
  await nextTick();
  if (!vnode.component?.ctx?.$refs) return;

  const tagsComponentRef = vnode.component.ctx.$refs.tags as HTMLElement | undefined;
  if (!tagsComponentRef) return;

  const tagsElements = tagsComponentRef?.querySelectorAll(".el-tag:not(.v-leave):not(.counter)");
  if (!tagsElements?.length) return;

  const counterElements = tagsComponentRef.querySelectorAll("span > .counter");
  const count = tagsElements.length - 1;
  const countString = count > 9 ? `>9` : `+${count}`;
  counterElements.forEach((e) => e.remove());

  const counter = `<span>
    <span class="el-tag counter el-tag--info el-tag--small el-tag--light"><span class="el-select__tags-text">${countString}</span></span>
  </span>`;

  const insertionPoint = tagsComponentRef.firstElementChild;
  if (count > 0 && insertionPoint) {
    insertionPoint.insertAdjacentHTML("beforeend", counter);
  }
};

export const computeTags: ObjectDirective<HTMLElement, any> = {
  mounted: (
    element: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ): void => {
    recomputeTags(element, binding, vnode);
  },
  updated: (
    element: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ): void => {
    recomputeTags(element, binding, vnode);
  },
};