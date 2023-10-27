<template>
  <div class="detail-container">
    <div class="banner" :style="'backgroundImage: url('+ film.poster+');'">
      <a href="/film/nowplaying">
        <img class="back-img" src="../../public/download.png" />
      </a>
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{film.name}}&nbsp;</span>
          <span class="item">{{film.item?film.item.name:''}}</span>
        </div>
        <div class="film-grade">
          <div class="grade">{{film.grade}}</div>
          <div class="grade-text">分</div>
        </div>
      </div>
      <div class="film-category gray-text">{{film.category}}</div>
      <div class="film-premiere-time gray-text">{{premieretime}}</div>
      <div class="film-nation-runtime gray-text">{{film.nation}} | {{film.runtime}}分钟</div>
      <div class="film-synopsis gray-text" :class="[hiddenSynopsis?'hidden':'']">{{film.synopsis}}</div>
      <div style="text-align: center;" @click="clickHiddenBtn">
        <i class="iconfont icon-less" v-if="!hiddenSynopsis"></i>
        <i class="iconfont icon-moreunfold" v-else></i>
      </div>
    </div>
    <div class="actor">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>

      <!-- 演职人员swiper -->
      <detail-swiper :swiperList="film.actors" v-if="film.actors" :slidesPerView="4">
        <!-- 注意传过来后取值问题 -->
        <template v-slot:default="{info}" class="actors-swiper">
          <van-image
            style="margin-right: 10px"
            cover
            class="img-actor"
            :src="info.avatarAddress"
            width="85"
            height="85"
          />
          <div class="actors-box">
            <div class="actors-name">{{info.name}}</div>
            <div class="actors-role">{{info.role}}</div>
          </div>
        </template>
      </detail-swiper>
    </div>
    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
      </div>
      <!-- 剧照swiper  -->
      <detail-swiper :swiperList="film.photos" v-if="film.photos" :slidesPerView="2">
        <!-- 注意传过来后取值问题 -->
        <template v-slot:default="{info}" class="actors-photos">
          <van-image
            style="margin-right: 10px"
            cover
            class="img-photos"
            :src="info"
            width="182"
            height="100"
          />
        </template>
      </detail-swiper>
    </div>
  </div>
</template>
<script>
import DetailSwiper from "@/components/DetailSwiper.vue";
import { getDetailData } from "@/api/index";
import { to } from "await-to-js";
import { Toast } from "vant";
import dayjs from "dayjs";

export default {
  name: "Detail",
  components: {
    DetailSwiper
  },
  data() {
    return {
      film: {},
      hiddenSynopsis: true
    };
  },
  computed: {
    premieretime() {
      return dayjs(this.film.premiereAt * 1000).format("YYYY-MM-DD");
    }
  },
  created() {
    this.getDetailList();
  },
  methods: {
    async getDetailList() {
      let filmId = Number(this.$route.query.id);
      const [err, { data: { film = {} } } = {}] =
        (await to(getDetailData({ filmId, k: 6951879 }))) || [];
      if (err) return Toast.fail("加载出错");
      this.film = film;
    },
    clickHiddenBtn() {
      this.hiddenSynopsis = !this.hiddenSynopsis;
    }
  }
};
</script>
<style lang="less" scoped>
.detail-container {
  .banner {
    height: 200px;
    background-size: cover;
    background-position: center center;

    .back-img {
      margin-top: 5px;
      margin-left: 5px;
      width: 30px;
      height: 30px;
    }
  }

  // 电影介绍
  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .col {
      display: flex;
      justify-content: space-between;
      .film-name {
        width: 256px;
        color: #191a1b;
        font-size: 18px;
        height: 24px;
        line-height: 24px;
        margin-right: 7px;
      }
      .film-grade {
        display: flex;
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .gray-text {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .film-category {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
      .gray-text();
    }
    .film-premiere-time {
      .gray-text();
    }
    // 上映时间
    .film-nation-runtime {
      .gray-text();
    }
    // // 剧情介绍
    .film-synopsis {
      margin-top: 12px;
      height: 98px;
      transition: height 0.5s ease;

      &.hidden {
        height: 36px !important;
        overflow: hidden;
      }
    }
  }

  .titleCommon {
    font-size: 16px;
    text-align: left;
    color: #191a1b;
    display: inline-block;
    height: 22.5px;
    line-height: 22px;
  }

  .actor {
    margin-top: 10px;
    .actors-title-bar {
      padding: 15px;
      width: 100%;
      .actors-title-text {
        .titleCommon();
      }
    }

    .actors-swiper {
      display: flex;
      width: 85px;
      height: 85px;
    }
    .img-actor {
      width: 45px;
      height: 45px;
    }

    .actors-box {
      text-align: center;
      .actors-name {
        padding-top: 10px;
        font-size: 12px;
        color: #191a1b;
        width: 85px;
        height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .actors-role {
        font-size: 10px;
        color: #797d82;
      }
    }
  }

  .photos {
    margin-top: 10px;
    .photos-title-bar {
      width: 100%;
      padding: 15px;
      .photos-title-text {
        .titleCommon();
      }
    }
  }
}
</style>