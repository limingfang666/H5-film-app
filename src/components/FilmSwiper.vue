<template>
<!-- 注意swiper-container书写位置 -->
  <div class="swiper-container">
    <!-- swiper-wrapper轮播图：插槽 -->
    <slot></slot>
    <!-- swiper-pagination 分页器-->
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";

export default {
  name: "FilmSwiper",
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      // autoplay:true,
      loop: true, // 循环模式选项
      pagination: {
        el: ".swiper-pagination"
      }
    });

    // 手动滑动
    mySwiper.slideNext();
    // 自动播放
    // mySwiper.autoplay.start();
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  .swiper-image {
    height: 200px;
    background-size: cover;
    background-position: center center;
  }
}
</style>
