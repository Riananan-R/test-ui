<template>
  <div class="t-collapse">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { CollapseProps } from "./collapse";

defineOptions({
  name: "t-collapse",
});

const props = defineProps(CollapseProps);

const opened = defineModel();

const changeOpened = (name) => {
  if (props.accordion) {
    opened.value = opened.value.includes(name) ? [] : [name];
  } else {
    opened.value.includes(name)
      ? (opened.value = opened.value.filter((item) => item !== name))
      : (opened.value = [...opened.value, name]);
  }
};

provide("opened", opened);
provide("changeOpened", changeOpened);
</script>
