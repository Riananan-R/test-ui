<template>
  <div
    class="t-carousel"
    :class="{
      't-carousel--vertical': props.direction === 'vertical',
      't-carousel--horizontal': props.direction === 'horizontal',
    }"
    :style="{ height: props.height }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ activeIndex }}
    <div class="t-carousel__container" :style="containerStyle">
      <slot></slot>
    </div>

    <div
      v-if="props.arrow !== 'never'"
      :class="['t-carousel__arrow', `t-carousel__arrow--${props.arrow}`]"
    >
      <button class="t-carousel__button t-carousel__button--prev" @click="prev">
        <i class="t-icon icon-arrow-left"></i>
      </button>
      <button class="t-carousel__button t-carousel__button--next" @click="next">
        <i class="t-icon icon-arrow-right"></i>
      </button>
    </div>

    <div
      v-if="props.indicatorPosition !== 'none'"
      :class="[
        't-carousel__indicators',
        `t-carousel__indicators--${props.indicatorPosition}`,
        {
          't-carousel__indicators--outside':
            props.indicatorPosition === 'outside',
        },
      ]"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        :class="[
          't-carousel__indicator',
          { 'is-active': index === activeIndex },
        ]"
        @click="setActiveItem(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, provide } from "vue";
import { CarouselProps } from "./carousel";

defineOptions({
  name: "t-carousel",
});

const props = defineProps(CarouselProps);

// 内部状态
const activeIndex = ref(props.initialIndex);
const items = ref([]);
const timer = ref(null);

setTimeout(() => {
  console.log("🚀 ~ items:", items);
}, 2000);

// 计算属性
const containerStyle = computed(() => {
  // const transform =
  //   props.direction === "vertical"
  //     ? `translateY(-${activeIndex.value * 100}%)`
  //     : `translateX(-${activeIndex.value * 100}%)`;
  return {
    // transform,
    transition: "transform .3s ease-in-out",
  };
});

// 方法
const addItem = (item) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@", item);
  items.value.push(item);
};

const removeItem = (uid) => {
  const index = items.value.findIndex((item) => item === uid);
  if (index > -1) {
    items.value.splice(index, 1);
  }
};

const setActiveItem = (index) => {
  if (index < 0) {
    activeIndex.value = props.loop ? items.value.length - 1 : 0;
  } else if (index >= items.value.length) {
    activeIndex.value = props.loop ? 0 : items.value.length - 1;
  } else {
    activeIndex.value = index;
  }
  console.log("🚀 ~ setActiveItem ~ index:", index);
};

const prev = () => {
  setActiveItem(activeIndex.value - 1);
};

const next = () => {
  setActiveItem(activeIndex.value + 1);
};

const startTimer = () => {
  if (props.interval <= 0 || !props.autoplay || timer.value) return;
  timer.value = setInterval(() => {
    next();
  }, props.interval);
};

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const handleMouseEnter = () => {
  stopTimer();
};

const handleMouseLeave = () => {
  startTimer();
};

// 生命周期钩子
onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

// 向子组件提供数据和方法
provide("carousel", {
  items,
  addItem,
  removeItem,
  activeIndex,
  direction: props.direction,
});
</script>
