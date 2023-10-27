<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :fixed="true"
      :title="title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        {{cityName}}
        <van-icon name="arrow-down" size="16" color="#323233"/>
      </template>
      <template #right>
        <van-icon name="search" size="23" color="#323233"/>
      </template>
    </van-nav-bar>
    <!-- 影院列表 -->
    <!--mouse-wheel -->
    <div class="mouse-wheel-vertical-scroll" ref="scroll">
      <div class="mouse-wheel-wrapper">
        <div class="mouse-wheel-content">
          <div v-for="cinema of cinemaList" :key="cinema.cinemaId" class="mouse-wheel-item">
            <div>{{cinema.name}}</div>
            <div class="address">{{cinema.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";
import MouseWheel from "@better-scroll/mouse-wheel";

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

import { mapState, mapActions } from "vuex";
export default {
  name: "Cinema",
  computed: {
    ...mapState("cinema", ["cinemaList"]),
    title() {
      return this.cinemaList[0] && this.cinemaList[0].cityName + "影院";
    },
    cityName() {
      return this.cinemaList[0] && this.cinemaList[0].cityName;
    }
  },
  created() {
    // 初始时给固定值cityId:210300。 cityId=${cityId}&ticketFlag=1&k=2500238`,
    let cityId = this.$route.params.cityId;
    this.getCinemaList({ cityId: cityId || 310100, ticketFlag: 1, k: 2500238 });
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    ...mapActions("cinema", ["getCinemaList"]),
    onClickLeft() {
      this.$router.push("city");
    },
    onClickRight() {
      this.$router.push({path:"/cinema/search"});
    },
    // 初始化Bscroll
    initBscroll() {
      new BScroll(this.$refs.scroll, {
        scrollY: true,
        scrollbar: true,
        // 因为mouse-wheel使用div页面DOM实例方式，不能再写对象，写了会报错
        // mouseWheel: {
        //   speed: 20,
        //   invert: false,
        //   easeTime: 300
        // }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mouse-wheel-item {
  padding: 5px;
  .address {
    font-size: 12px;
    color: gray;
  }
}
</style>