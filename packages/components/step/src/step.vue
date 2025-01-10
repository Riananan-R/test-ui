<template>
  <div class="t-step" ref="stepRef">
    {{ stepsUids }} {{ instance.uid }}
    <div class="t-step__head">
      <span class="t-step__icon t-icon"> {{ currentIndex }}</span>
      <div class="t-step__line"></div>
    </div>
    <div class="t-step__content">
      <div class="t-step__title">{{ title }}</div>
      <div class="t-step__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, onMounted, computed, getCurrentInstance, watch } from "vue";
import { StepProps } from "./step";

const props = defineProps(StepProps);
const stepRef = ref(null);

defineOptions({
  name: "t-step",
});
const instance = getCurrentInstance();

// const stepsUids = inject("stepsUids");
const stepsUids = ref([]);
const getStepUids = inject("getStepUids");

const currentIndex = computed(() => {
  console.log(1232);
  return stepsUids.value.findIndex((uid) => uid === instance.uid);
});
</script>
