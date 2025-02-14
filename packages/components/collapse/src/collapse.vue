<template>
  <div class="t-collapse">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide } from "vue";

defineOptions({
  name: "t-collapse",
});

const opened = defineModel();

const changeOpened = (name) => {
  opened.value.includes(name)
    ? (opened.value = opened.value.filter((item) => item !== name))
    : (opened.value = [...opened.value, name]);
};

provide("opened", opened);
provide("changeOpened", changeOpened);
</script>
