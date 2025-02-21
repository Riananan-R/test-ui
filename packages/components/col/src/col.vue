<template>
  <div
    :class="[
      't-col',
      span && `t-col-${span}`,
      offset && `t-col-offset-${offset}`,
    ]"
    :style="{
      paddingLeft: gutter ? gutter / 2 + 'px' : '0',
      paddingRight: gutter ? gutter / 2 + 'px' : '0',
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { ColProps } from "./col";
import { inject } from "vue";

defineOptions({
  name: "t-col",
});

const props = defineProps(ColProps);

const gutter = inject("gutter");
</script>
