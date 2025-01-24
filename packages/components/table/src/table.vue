<template>
  <div :class="['t-table', border ? 't-table--border' : '']">
    <div class="t-table__thead-wrapper">
      <table class="t-table__thead">
        <thead>
          <tr>
            <th
              v-for="theadItem in columnData"
              :key="theadItem.key"
              :style="{
                width: theadItem.width + 'px',
                flex: theadItem.width ? 'none' : 1,
              }"
            >
              <div class="cell">{{ theadItem.label }}</div>
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
    >
      <table class="t-table__tbody">
        <tbody>
          <tr
            v-for="(rowItem, index) in tableData"
            :key="'table_row_' + index"
            :class="{
              't-table__tbody--stripe': stripe && index % 2 === 1,
            }"
          >
            <td
              v-for="(colItem, i) in columnData"
              :key="'table_col_' + i"
              :style="{
                width: colItem.width + 'px',
                flex: colItem.width ? 'none' : 1,
              }"
            >
              <div class="cell">
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
import { TableProps } from "./table";

defineOptions({
  name: "t-table",
});

const props = defineProps(TableProps);
</script>
