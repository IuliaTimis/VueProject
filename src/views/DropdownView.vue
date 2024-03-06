<template>
  <div>
    <p>Dropdown:</p>
    <dropdown-component v-model="value" :options="options"></dropdown-component>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Dropdown from "../components/dropdown/Dropdown.vue";

@Options({
  components: {
    "dropdown-component": Dropdown,
  },
})
export default class App extends Vue {
  options = [
    {
      value: "Option1",
      label: "Option1",
    },
    {
      value: "Option2",
      label: "Option2",
    },
    {
      value: "Option3",
      label: "Option3",
    },
    {
      value: "Option4",
      label: "Option4",
    },
    {
      value: "Option5",
      label: "Option5",
    },
  ];
  value = "";
}
</script>