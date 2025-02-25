<template>
  <div class="t-row">
    <div
      class="t-row__wapper"
      :style="{
        marginLeft: gutter ? -gutter / 2 + 'px' : 0,
        marginRight: gutter ? -gutter / 2 + 'px' : 0,
        justifyContent: justify,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { RowProps } from "./row";

defineOptions({
  name: "t-row",
});

const props = defineProps(RowProps);

provide("gutter", props.gutter);
</script>
