<template>
  <div ref="detailWrapper" class="swiper-container">
    <div class="swiper-wrapper">
      <!--  class="swiper-slide"一定要有swiper-slide才能生效 -->
      <div class="swiper-slide" v-for="item of swiperList" :key="item.name">
        <slot :info="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";

export default {
  name: "DetailSwiper",
  //   传入的swiper数据
  props: {
    swiperList: {
      type: Array,
      // 需要返回函数
      default: () => []
    },
    slidesPerView: {
      type: Number,
      default: 4
    },
    spaceBetween: {
      type: Number,
      default: 20
    },
    freeMode: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      freeMode: this.freeMode || true, //启用自由模式功能。可设置具体参数或true来使用默认设置。开启自由模式后，Swiper 会根据惯性滑动可能不止一格且不会贴合。
      slidesPerView: this.slidesPerView || 4, //设置slider容器能够同时显示的slides数量(carousel模式)。
      spaceBetween: this.spaceBetween || 10, //在slide之间设置距离（单位px），也可以设置百分比
      loop: true // 循环模式选项
    });
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  
  .swiper-slide {
    width: 85px;
    height: 132px;
    margin-right: 10px;

    .swiper-image {
      background-size: cover;
      background-position: center center;
    }
  }
}
</style>
