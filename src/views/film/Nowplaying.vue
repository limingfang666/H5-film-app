<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <van-cell v-for="item in playingList" :key="item.filmId" @click="gotoDetail(item.filmId)">
      <img :src="item.poster" alt />
      <h3>{{item.name}}</h3>
      <p class="actor">主演：{{item.actors | joinActor}}</p>
      <p>{{item.nation}} | {{item.runtime}}分钟</p>
      <!-- <template v-slot:loading>
        <div>数据加载完毕~</div>
      </template> -->
    </van-cell>
  </van-list>
</template>
<script>
import { getNowPlayingData } from "@/api/index";
import { Toast } from "vant";
import { to } from "await-to-js";

export default {
  name: "Nowplaying",
  filters: {
    joinActor(actors) {
      // actors要进行容错
      return actors? actors.reduce((result, item) => result + " " + item.name, ""): "";
    }
  },
  computed: {},
  data() {
    return {
      playingList: [],
      loading: false,
      finished: false,
      // 数据总条数
      total: 0,
      playingParams: {
        cityId: 310100,
        pageNum: 1,
        pageSize: 10,
        type: 1,
        k: 136082
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 这个方法第一次会触发一次，可以关闭immediate-check
    onLoad() {
      this.playingParams.pageNum++;
      
      let totalPage = Math.ceil(this.total / this.playingParams.pageSize);
      if (this.playingParams.pageNum > totalPage) {
        this.finished = true;      
        return;
      }
      // // 需要在onLoad方法中再加载一次
      this.loadData();
    },
    async loadData() {
      try {
        const [err, { data } = {}] = await to(getNowPlayingData(this.playingParams)) || [];
        if (err) return Toast.fail("加载出错");
        this.playingList = [...this.playingList, ...data.films];
        this.total = data.total;

        // 加载状态结束:在每次请求完毕后，需要手动将loading设置为false，表示加载结束
        this.loading = false;
      } catch (error) {
        Toast.fail("加载出错");
      }
    },
    async gotoDetail(filmId){
      // query才会设置到地址栏
        this.$router.push({name:"detail", query:{id: filmId}});
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  text-align: left;

  img {
    float: left;
    margin-right: 10px;
    width: 66px;
  }
  h3 {
    font-size: 1.17em;
  }
  p {
    &.actor {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>