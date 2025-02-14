<template>
  <div class="t-collapse-item">
    <div class="t-collapse-item__header" @click="handleClickCollapse">
      <div class="t-collapse-item__header-title">{{ title }}</div>
      <i class="t-icon icon-arrow-right"></i>
    </div>
    <div class="t-collapse-item__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { CollapseItemProps } from "./collapse-item";
import { inject } from "vue";

defineOptions({
  name: "t-collapse-item",
});

const props = defineProps(CollapseItemProps);
const opened = inject("opened");
const changeOpened = inject("changeOpened");

const handleClickCollapse = () => {
  changeOpened(props.name);
};
</script>
