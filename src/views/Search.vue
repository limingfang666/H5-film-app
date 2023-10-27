<template>
  <div>
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @cancel="onCancel"
    @input="onSearch"
  />
   <div class="mouse-wheel-vertical-scroll" v-if="searchCinemaList(value).length>0">
      <div class="mouse-wheel-wrapper" ref="scroll">
        <div class="mouse-wheel-content">
          <div v-for="cinema of searchCinemaList(value)" :key="cinema.cinemaId" class="mouse-wheel-item">
            <div>{{cinema.name}}</div>
            <div class="address">{{cinema.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters} from "vuex"

export default {
  name: "Search",
  data() {
    return {
      value: ""
    };
  },
  computed:{
      ...mapGetters("cinema",["searchCinemaList"])
  },
  methods: {
    onSearch(val) {
      if(val==='') return;
        // 注意搜索icon无法点击需要用input事件
        this.searchCinemaList(val);
    },
    onCancel() {
      this.$router.back();
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