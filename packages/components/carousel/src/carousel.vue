<template>
  <div
    class="t-carousel"
    :style="{ height: props.height }"
    @mouseenter="handleMouseEvent('enter')"
    @mouseleave="handleMouseEvent('leave')"
  >
    <div class="t-carousel__container">
      <slot></slot>
    </div>
    <button
      class="t-carousel__arrow t-carousel__arrow-left"
      @click="play('prev')"
      v-if="props.arrow !== 'never' && items.length > 1"
      :style="{
        left:
          props.arrow === 'always' || (props.arrow !== 'never' && isHovering)
            ? '10px'
            : '-50px',
      }"
    >
      <i class="t-icon icon-arrow-left-bold"></i>
    </button>
    <button
      class="t-carousel__arrow t-carousel__arrow-right"
      @click="play('next')"
      v-if="props.arrow !== 'never'"
      :style="{
        right:
          props.arrow === 'always' || (props.arrow !== 'never' && isHovering)
            ? '10px'
            : '-50px',
      }"
    >
      <i class="t-icon icon-arrow-right-bold"></i>
    </button>
    <ul class="t-carousel__indicators">
      <li
        v-for="(_, index) in items"
        :key="`indicators_${index}`"
        :class="[
          't-carousel__indicator',
          { 'is-active': index === activeIndex },
        ]"
        @click="activeIndex = index"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from "vue";
import { CarouselProps } from "./carousel";

defineOptions({
  name: "t-carousel",
});

const props = defineProps(CarouselProps);

const items = ref([]);
const activeIndex = ref(0);
const loopDirection = ref("next");
const isHovering = ref(false);
let timer = null;

const addItem = (item) => {
  items.value.push(item);
};

const removeItem = (uid) => {
  const index = items.value.findIndex((item) => item === uid);
  if (index > -1) {
    items.value.splice(index, 1);
  }
};

const play = (direction) => {
  loopDirection.value = direction;
  if (direction === "prev") {
    activeIndex.value =
      activeIndex.value - 1 < 0
        ? items.value.length - 1
        : activeIndex.value - 1;
  } else {
    activeIndex.value =
      activeIndex.value + 1 > items.value.length - 1
        ? 0
        : activeIndex.value + 1;
  }
};

const handleMouseEvent = (type) => {
  if (type === "enter") {
    isHovering.value = true;
    timer && clearInterval(timer);
  } else {
    isHovering.value = false;
    if (props.autoplay && props.interval > 0) {
      timer = setInterval(() => {
        play("next");
      }, props.interval);
    }
  }
};

onMounted(() => {
  if (props.autoplay && props.interval > 0) {
    timer = setInterval(() => {
      play("next");
    }, props.interval);
  }
});

onUnmounted(() => {
  timer && clearInterval(timer);
});

provide("carousel", {
  items,
  addItem,
  removeItem,
  activeIndex,
  loopDirection,
});
</script>
