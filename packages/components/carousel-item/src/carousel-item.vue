<template>
  <Transition :name="transitionName" v-show="currentIndex === activeIndex">
    <div
      class="t-carousel-item"
      :class="{
        'is-active': currentIndex === activeIndex,
      }"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
import {
  ref,
  inject,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import { CarouselItemProps } from "./carousel-item";

defineOptions({
  name: "t-carousel-item",
});

const props = defineProps(CarouselItemProps);

const uid = ref(Symbol("carousel-item"));
const transitionName = ref("");

const carousel = inject("carousel");

const { activeIndex, items, addItem, removeItem, loopDirection } = carousel;

const currentIndex = computed(() => {
  return items.value.indexOf(uid.value);
});

onMounted(() => {
  addItem(uid.value);
  nextTick(() => {
    transitionName.value = "carousel-next";
  });
});

onBeforeUnmount(() => {
  removeItem(uid.value);
});

watch(
  () => loopDirection.value,
  (newVal) => {
    transitionName.value = `carousel-${newVal}`;
  }
);
</script>
