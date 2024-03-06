import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BreadcrumbItem from "./breadcrumb-item/BreadcrumbItem.vue";
import { BreadcrumbEntry } from "./BreadcrumbEntry";
import { ElButton } from "element-plus";

@Component({
  name: "Breadcrumb",
  components: { "breadcrumb-item": BreadcrumbItem, ElButton },
})
export default class Breadcrumb extends Vue {
  /**
   * Whether the items except first and last should be truncated.
   */
  @Prop({ default: false })
  declare truncate: boolean;

  /**
   * Array of objects. Each object is rendered as a breadcrumb item component containing the key, title, and to.
   */
  @Prop({ default: () => [] })
  declare items: BreadcrumbEntry[];

  /**
   * If there is more than one item in the breadcrumb, it shows an `x` icon at the end of the breadcrumb.
   */
  @Prop({ default: true })
  declare showClearButton: boolean;

  isTitleOnly = true;
  isTruncated = false;

  mounted(): void {
    const items = this.$el.querySelectorAll(".breadcrumb-item");
    this.isTitleOnly = items.length === 1;
    this.isTruncated = this.truncate;
  }

  breadcrumbBack(): void {
    /**
     * Triggers when breadcrumb back button is clicked.
     */
    this.$emit("breadcrumb-back");
  }

  breadcrumbClear(): void {
    /**
     * Triggers when breadcrumb clear button is clicked.
     */
    this.$emit("breadcrumb-clear");
  }

  private get truncatedItems(): BreadcrumbEntry[] {
    return this.items
      .slice(1, -1)
      .map((el) => ({ title: "...", to: el.to ?? "", key: el.key }));
  }

  get itemsToRender(): BreadcrumbEntry[] {
    return this.isTruncated
      ? [
          this.items[0],
          ...this.truncatedItems,
          this.items[this.items.length - 1], // Reverted as per suggestion
        ]
      : this.items;
  }

  @Watch("items")
  private onItemsChange(): void {
    this.isTruncated = false;
    this.isTitleOnly = this.items.length === 1;
    this.$nextTick(() => {
      const parentWidth = this.$parent?.$el.clientWidth;
      const elWidth = this.$el.clientWidth;
      if (parentWidth && elWidth > parentWidth) {
        this.isTruncated = true;
      }
    });
  }

  @Watch("truncate")
  private onChangeTruncated(): void {
    this.isTruncated = this.truncate;
  }
}