<template>
  <div
    :class="[
      't-table',
      border ? 't-table--border' : '',
      isOverflow ? 't-table__has_scroll' : '',
    ]"
    ref="tableRef"
  >
    <div class="t-table__thead-wrapper">
      <table class="t-table__thead">
        <colgroup>
          <col
            v-for="colItem in columnData"
            :key="'table_col_' + colItem.key"
            :width="colItem.width || averageWidth"
          />
          <col width="8" v-if="isOverflow" />
        </colgroup>
        <thead>
          <tr>
            <th v-for="theadItem in columnData" :key="theadItem.key">
              <div
                class="cell"
                :style="{
                  textAlign: theadItem.align || 'left',
                }"
              >
                {{ theadItem.label }}
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="t-table__tbody-wrapper"
      :style="{
        height: height ? height + 'px' : 'auto',
        overflow: height ? 'auto' : 'hidden',
      }"
      ref="tbodyWrapperRef"
    >
      <table class="t-table__tbody">
        <colgroup>
          <col
            v-for="colItem in columnData"
            :key="'table_col_' + colItem.key"
            :width="colItem.width || averageWidth"
          />
        </colgroup>
        <tbody>
          <tr
            v-for="(rowItem, index) in tableData"
            :key="'table_row_' + index"
            :class="{
              't-table__tbody--stripe': stripe && index % 2 === 1,
            }"
          >
            <td v-for="(colItem, i) in columnData" :key="'table_col_' + i">
              <div
                class="cell"
                :style="{
                  textAlign: colItem.align || 'left',
                  justifyContent: colItem.align
                    ? justifyContentMap[colItem.align]
                    : 'flex-start',
                }"
              >
                <slot
                  :name="colItem.key"
                  v-bind="{ scoped: rowItem, $index: index }"
                >
                  {{ rowItem[colItem.key] }}
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { TableProps } from "./table";

defineOptions({
  name: "t-table",
});

const props = defineProps(TableProps);
const tableRef = ref(null);
const tbodyWrapperRef = ref(null);
const isOverflow = ref(false);
const averageWidth = ref(0);
const justifyContentMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const calcColumnWidth = () => {
  const tableWrapperWidth = tbodyWrapperRef.value.offsetWidth;
  // const tbodyWrapperWidth = tbodyWrapperRef.value.offsetWidth;
  const tbodyWrapperHeight = tbodyWrapperRef.value.offsetHeight;
  const scrollHeight = tbodyWrapperRef.value.scrollHeight;
  isOverflow.value = scrollHeight > tbodyWrapperHeight;

  const columnWidthArrs = props.columnData
    .filter((item) => item.width)
    .map((item) => item.width);
  const sumOfColumnWidth = columnWidthArrs.reduce(
    (x, y) => parseInt(x) + parseInt(y)
  );

  averageWidth.value = isOverflow.value
    ? (tableWrapperWidth - sumOfColumnWidth - 8) /
      (props.columnData.length - columnWidthArrs.length)
    : (tableWrapperWidth - sumOfColumnWidth) /
      (props.columnData.length - columnWidthArrs.length);
};

watch(
  () => props.columnData,
  () => {
    nextTick(() => {
      calcColumnWidth();
    });
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  window.addEventListener("resize", calcColumnWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcColumnWidth);
});
</script>
