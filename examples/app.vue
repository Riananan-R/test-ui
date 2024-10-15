<template>
  <div>
    <!-- button -->
    <h3>Button</h3>
    <div>
      <t-button>default</t-button>
      <t-button type="primary">primary</t-button>
      <t-button type="success">success</t-button>
      <t-button type="info">info</t-button>
      <t-button type="warning">warning</t-button>
      <t-button type="danger">danger</t-button>
    </div>
    <h3>Button size</h3>
    <div style="margin-bottom: 10px">
      <t-button type="primary" size="small">primary</t-button>
      <t-button type="success" size="small">success</t-button>
      <t-button type="info" size="small">info</t-button>
      <t-button type="warning" size="small">warning</t-button>
      <t-button type="danger" size="small">danger</t-button>
    </div>
    <div>
      <t-button type="primary" size="mini">primary</t-button>
      <t-button type="success" size="mini">success</t-button>
      <t-button type="info" size="mini">info</t-button>
      <t-button type="warning" size="mini">warning</t-button>
      <t-button type="danger" size="mini">danger</t-button>
    </div>
    <h3>Button round</h3>
    <div style="margin-bottom: 10px">
      <t-button round>default</t-button>
      <t-button type="primary" round>primary</t-button>
      <t-button type="success" round>success</t-button>
      <t-button type="info" round>info</t-button>
      <t-button type="warning" round>warning</t-button>
      <t-button type="danger" round>danger</t-button>
    </div>

    <h3>Button disabled</h3>
    <div>
      <t-button type="primary" disabled>primary</t-button>
      <t-button type="success" disabled>success</t-button>
      <t-button type="info" disabled>info</t-button>
      <t-button type="warning" disabled>warning</t-button>
      <t-button type="danger" disabled>danger</t-button>
    </div>

    <h3>Button icon</h3>

    <div>
      <t-button type="primary" icon="chart-bar">primary</t-button>
      <t-button type="success" icon="calendar">success</t-button>
      <t-button type="info" icon="data-view"></t-button>
      <t-button type="primary" icon="download"></t-button>
    </div>

    <h3>Button loading</h3>

    <div>
      <t-button type="primary" :loading="loading">加载中</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 3000);
</script>

<style scoped></style>
