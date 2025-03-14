<template>
  <!-- v-show="isActive" -->
  <div
    class="t-carousel-item"
    :class="{
      'is-active': isActive,
      't-carousel-item--card': isCard,
      't-carousel-item--vertical': isVertical,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onBeforeUnmount } from "vue";
import { CarouselItemProps } from "./carousel-item";

defineOptions({
  name: "t-carousel-item",
});

const props = defineProps(CarouselItemProps);

const uid = ref(Symbol("carousel-item"));

// 注入来自父组件的数据和方法
const carousel = inject("carousel");
console.log("carousel: ", carousel);
const { activeIndex, items, direction, addItem, removeItem } = carousel;

// 计算属性
const isActive = computed(() => {
  console.log(
    "activeIndex.value == items.value.indexOf(uid)12312: ",
    activeIndex.value,
    items.value.indexOf(uid)
  );
  return activeIndex.value == items.value.indexOf(uid.value);
});

const isVertical = computed(() => {
  return direction === "vertical";
});

// 生命周期钩子
onMounted(() => {
  addItem(uid.value);
});

onBeforeUnmount(() => {
  removeItem(uid.value);
});
</script>
