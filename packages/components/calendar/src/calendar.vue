<template>
  <div class="t-calendar">
    <div class="t-calendar__header">
      <div class="t-calendar__button-group">
        <span
          class="t-calendar__button-prev"
          @click="handleChangeMonth('prev')"
        >
          <i class="t-icon icon-arrow-left-bold"></i>
        </span>
        <span>
          {{ currentYear }}年{{ currentMonth.toString().padStart(2, "0") }}月
        </span>
        <span
          class="t-calendar__button-next"
          @click="handleChangeMonth('next')"
        >
          <i class="t-icon icon-arrow-right-bold"></i>
        </span>
      </div>
      <t-button size="small" @click="resetToday">回到今天</t-button>
    </div>
    <div class="t-calendar__body">
      <table cellspacing="0" cellpadding="0" class="t-calendar-table">
        <thead>
          <tr>
            <th v-for="day in week" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in cellData" :key="'week' + index">
            <td v-for="dayInfo in week" :key="dayInfo.day">
              <div
                :class="`t-calendar-day ${
                  dayInfo.type === 'prev'
                    ? 't-calendar-day__prev'
                    : dayInfo.type === 'next'
                    ? 't-calendar-day__next'
                    : ''
                } ${
                  dayInfo.dateFormated === activeDate
                    ? 't-calendar-day__active'
                    : ''
                } ${
                  dayInfo.dateFormated === today ? 't-calendar-day__today' : ''
                }
                `"
                @click="handleClickDate(dayInfo)"
              >
                <div class="t-calendar-day-number">
                  <slot name="date-cell" v-bind="dayInfo">
                    {{ dayInfo.day }}
                  </slot>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
defineOptions({
  name: "t-calendar",
});

const week = ["日", "一", "二", "三", "四", "五", "六"];
const cellData = ref([]);
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const today =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  new Date().getDate().toString().padStart(2, "0");
const activeDate = ref(today);

const createCellData = (
  year = currentYear.value,
  month = currentMonth.value
) => {
  const currentMonthdayNum = new Date(year, month - 1, 0).getDate();
  const firstDayNum = new Date(year, month - 1, 1).getDay(); // 本月第一天是星期几
  const endDayNum = new Date(year, month - 1, currentMonthdayNum).getDay(); // 本月最后一天是星期几
  const rowNum = Math.ceil((firstDayNum + currentMonthdayNum) / 7); // 行数
  cellData.value = [...Array(rowNum)].map(() => []);
  [...Array(currentMonthdayNum)].forEach((_, i) => {
    const rowIndex = Math.floor((i + firstDayNum) / 7);
    const dayInfo = {
      year,
      month,
      day: i + 1,
      type: "normal",
      date: new Date(year, month - 1, i + 1),
      dateFormated: `${year}-${month.toString().padStart(2, "0")}-${(i + 1)
        .toString()
        .padStart(2, "0")}`,
    };
    cellData.value[rowIndex].push(dayInfo);
  });
  if (firstDayNum !== 0) {
    const lastYear = month - 1 < 1 ? year - 1 : year;
    const lastMonth = month - 1 < 1 ? 12 : month - 1;
    [...Array(firstDayNum)].forEach((_, i) => {
      const dayNum = new Date(lastYear, lastMonth - 1, 0 - i).getDate();
      cellData.value[0].unshift({
        year: lastYear,
        month: lastMonth,
        day: dayNum,
        type: "prev",
        date: new Date(lastYear, lastMonth - 1, dayNum),
        dateFormated: `${lastYear}-${lastMonth
          .toString()
          .padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`,
      });
    });
  }
  if (endDayNum !== 6) {
    const nextYear = month + 1 > 12 ? year + 1 : year;
    const nextMonth = month + 1 > 12 ? 1 : month + 1;
    [...Array(6 - endDayNum)].forEach((_, i) => {
      cellData.value[rowNum - 1].push({
        year: nextYear,
        month: nextMonth,
        day: i + 1,
        type: "next",
        date: new Date(nextYear, nextMonth - 1, i + 1),
        dateFormated: `${nextYear}-${nextMonth.toString().padStart(2, "0")}-${(
          i + 1
        )
          .toString()
          .padStart(2, "0")}`,
      });
    });
  }
};

const handleChangeMonth = (type) => {
  if (type === "prev") {
    if (currentMonth.value - 1 < 1) {
      currentMonth.value = 12;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
  } else {
    if (currentMonth.value + 1 > 12) {
      currentMonth.value = 1;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
  }
  createCellData(currentYear.value, currentMonth.value);
};

const handleClickDate = (dayInfo) => {
  activeDate.value = dayInfo.dateFormated;
  if (dayInfo.type !== "normal") {
    currentYear.value = dayInfo.year;
    currentMonth.value = dayInfo.month;
    createCellData(currentYear.value, currentMonth.value);
  }
};

const resetToday = () => {
  activeDate.value = today;
  currentYear.value = new Date().getFullYear();
  currentMonth.value = new Date().getMonth() + 1;
  createCellData();
};

onMounted(() => {
  createCellData();
});
</script>
