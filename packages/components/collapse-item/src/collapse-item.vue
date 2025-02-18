<template>
  <div
    :class="`t-collapse-item ${
      opened.includes(name) ? 't-collapse-item--active' : ''
    }`"
  >
    <div class="t-collapse-item__header" @click="handleClickCollapse">
      <div class="t-collapse-item__header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div>
        <slot name="icon" :isActive="opened.includes(name)">
          <i class="t-icon icon-arrow-right"></i>
        </slot>
      </div>
    </div>
    <div class="t-collapse-item__content">
      <div class="t-collapse-item__reference">
        <div class="t-collapse-item__body">
          <slot />
        </div>
      </div>
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
