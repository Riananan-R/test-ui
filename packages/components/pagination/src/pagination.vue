<template>
  <div class="t-pagination">
    <ul class="t-pagination-list">
      <li
        class="t-pagination-pre t-icon icon-arrow-left-bold t-pagination-item"
        :style="{
          cursor: firstPage === currentPage ? 'not-allowed' : 'pointer',
          color: firstPage === currentPage ? '#ccc' : null,
        }"
        @click="handlePageGo('retreat', 1)"
      ></li>
      <li
        class="t-pagination-item"
        :class="{ 't-pagination-item__active': firstPage === currentPage }"
        @click="handleChangeCurrentPage(firstPage)"
      >
        {{ firstPage }}
      </li>
      <li
        :class="`t-pagination-item t-icon ${frontIcon}`"
        v-if="showFrontEllipsis"
        @mouseenter="handleMouseOver('left')"
        @mouseleave="handleMouseLeave('left')"
        @click="handlePageGo('retreat', 5)"
      ></li>
      <li
        v-for="page in centerPages"
        :key="page"
        class="t-pagination-item"
        :class="{ 't-pagination-item__active': page === currentPage }"
        @click="handleChangeCurrentPage(page)"
      >
        {{ page }}
      </li>
      <li
        :class="`t-pagination-item t-icon ${endIcon}`"
        v-if="showEndEllipsis"
        @mouseenter="handleMouseOver('right')"
        @mouseleave="handleMouseLeave('right')"
        @click="handlePageGo('forward', 5)"
      ></li>
      <li
        class="t-pagination-item"
        :class="{ 't-pagination-item__active': lastPage === currentPage }"
        @click="handleChangeCurrentPage(lastPage)"
      >
        {{ lastPage }}
      </li>
      <li
        class="t-pagination-next t-icon icon-arrow-right-bold t-pagination-item"
        :style="{
          cursor: lastPage === currentPage ? 'not-allowed' : 'pointer',
          color: lastPage === currentPage ? '#ccc' : null,
        }"
        @click="handlePageGo('forward', 1)"
      ></li>
    </ul>

    <div class="t-pagination__jump" v-if="showJump">
      <span>跳转至</span>
      <input
        type="number"
        v-model="goToNum"
        class="t-pagination__editor"
        @keydown.enter="handleGoToPage"
      />
    </div>
  </div>
</template>

<script setup>
import { PaginationProps, PaginationEmits } from "./pagination";
import { computed, onMounted, ref } from "vue";

defineOptions({
  name: "t-pagination",
});

const props = defineProps(PaginationProps);
const emit = defineEmits(PaginationEmits);

// 根据总数和每页数量计算出页数
const pageCount = computed(() =>
  [...Array(Math.ceil(props.total / props.pageSize)).keys()].map((i) => i + 1)
);
// const currentPage = ref(5); // 当前页面
const showFrontEllipsis = ref(false); // 是否显示前面的省略号
const showEndEllipsis = ref(false); // 是否显示后面的省略号
const frontIcon = ref("icon-elipsis");
const endIcon = ref("icon-elipsis");
const goToNum = ref(null);

const firstPage = 1; // 第一页
const lastPage = computed(() => pageCount.value.length); // 最后一页

// 中间的页码
const centerPages = computed(() => {
  const center = pageCount.value.slice(1, pageCount.value.length - 1);
  if (pageCount.value.length > 7) {
    if (props.currentPage === 1) {
      showFrontEllipsis.value = false;
      showEndEllipsis.value = true;
      frontIcon.value = "icon-elipsis";
      return center.slice(0, 5);
    } else if (props.currentPage === lastPage.value) {
      showFrontEllipsis.value = true;
      showEndEllipsis.value = false;
      endIcon.value = "icon-elipsis";
      return center.slice(-5);
    } else if (center.indexOf(props.currentPage) < 3) {
      showFrontEllipsis.value = false;
      showEndEllipsis.value = true;
      frontIcon.value = "icon-elipsis";
      return center.slice(0, 5);
    } else if (center.indexOf(props.currentPage) > center.length - 4) {
      showFrontEllipsis.value = true;
      showEndEllipsis.value = false;
      endIcon.value = "icon-elipsis";
      return center.slice(-5);
    } else {
      showFrontEllipsis.value = true;
      showEndEllipsis.value = true;
      const center = [
        props.currentPage - 2,
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        props.currentPage + 2,
      ];
      return center;
    }
  } else {
    return center;
  }
});

const handleChangeCurrentPage = (page) => {
  emit("update:current-page", page);
};

const handleMouseOver = (direction) => {
  if (direction === "left") {
    frontIcon.value = "icon-arrow-double-left";
  } else {
    endIcon.value = "icon-arrow-double-right";
  }
};

const handleMouseLeave = (direction) => {
  if (direction === "left") {
    frontIcon.value = "icon-elipsis";
  } else {
    endIcon.value = "icon-elipsis";
  }
};

const handlePageGo = (direction, num) => {
  if (
    (direction === "forward" && props.currentPage === lastPage.value) ||
    (direction === "backward" && props.currentPage === firstPage)
  )
    return;
  if (direction === "forward") {
    emit(
      "update:current-page",
      props.currentPage + num > lastPage.value ? lastPage.value : props.currentPage + num
    );
  } else {
    emit(
      "update:current-page",
      props.currentPage - num < firstPage ? firstPage : props.currentPage - num
    );
  }
};

const handleGoToPage = () => {
  if (goToNum.value) {
    const targetPageNum =
      goToNum.value < 0 ? 1 : goToNum.value > lastPage.value ? lastPage.value : goToNum.value;
    goToNum.value = targetPageNum;
    emit("update:current-page", targetPageNum);
  }
};
</script>
