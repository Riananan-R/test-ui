<template>
  <div>
    <!-- button -->
    <h2>按钮</h2>
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
    <!-- message -->
    <h2>消息</h2>
    <h3>Message</h3>
    <t-button type="success" @click="handleMessage('success')">success</t-button>
    <t-button type="info" @click="handleMessage('info')">info</t-button>
    <t-button type="warning" @click="handleMessage('warning')">warning</t-button>
    <t-button type="danger" @click="handleMessage('error')">danger</t-button>
    <h3>Message close</h3>
    <t-button type="success" @click="handleMessage('success', true)">success</t-button>
    <t-button type="info" @click="handleMessage('info', true)">info</t-button>
    <t-button type="warning" @click="handleMessage('warning', true)">warning</t-button>
    <t-button type="danger" @click="handleMessage('error', true)">danger</t-button>
    <h3>Message time</h3>
    <t-button type="success" @click="handleMessage('success', true, 1000)">1s</t-button>
    <t-button type="success" @click="handleMessage('success', true, 5000)">5s</t-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TMessage } from "@test-ui/components";

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 3000);

const handleMessage = (type, showClose, time) => {
  TMessage({
    type,
    message: type,
    showClose,
    duration: time,
  });
};
</script>

<style scoped></style>
