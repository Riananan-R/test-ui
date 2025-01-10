<template>
  <div class="t-steps">
    {{ childrenCount }}
    <slot></slot>
    <slot name="aaa"></slot>
    <div class="eee"></div>
    <div id="rrr"></div>
  </div>
</template>
<script setup>
import {
  onMounted,
  provide,
  ref,
  onBeforeUnmount,
  useSlots,
  getCurrentInstance,
  nextTick,
} from "vue";
import { StepsProps } from "./steps";

const props = defineProps(StepsProps);

defineOptions({
  name: "t-steps",
});

const childrenCount = ref(0);
const stepsUids = ref([]);

provide("stepsUids", stepsUids);
provide("getStepUids", getStepUids);

// onMounted(() => {
//   // console.log("onMounted");
//   getStepUids();
// });

const getStepUids = () => {
  const instance = getCurrentInstance();
  const defaultSlots = instance.subTree.children.find((t) => t.key === "_default");
  stepsUids.value = defaultSlots.children
    .filter((vnode) => vnode.type.name === "t-step")
    .map((v) => v.component.uid);
};
</script>
