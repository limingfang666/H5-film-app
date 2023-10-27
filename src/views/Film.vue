<template>
  <div>
    <!-- swiper区域 -->
    <film-swiper>
      <template v-slot:default>
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) of imgList" :key="index">
            <div class="swiper-image" :style="'backgroundImage: url('+item+');'"></div>
          </div>
        </div>
      </template>
    </film-swiper>
    <!-- 公共Tab -->
    <film-header></film-header>
    <router-view></router-view>
  </div>
</template>
<script>
import FilmHeader from "@/components/FilmHeader.vue";
import FilmSwiper from "@/components/FilmSwiper.vue";
export default {
  name: "Film",
  components: {
    FilmHeader,
    FilmSwiper
  },
  data() {
    return {
      imgList: [
        "http://124.223.69.156:5500/h5-01.jpg",
        "http://124.223.69.156:5500/h5-02.jpg",
        "http://124.223.69.156:5500/h5-03.png"
      ]
    };
  }
};
</script>