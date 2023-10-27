<template>
  <div>
    <van-index-bar :index-list="indexList" ref="indexBar">
      <div v-for="item of rebuildCityList" :key="item.type">
        <van-index-anchor :index="item.type">{{item.type}}</van-index-anchor>
        <van-cell @click="selectCity(city.cityId)" :title="city.name" v-for="city of item.list" :key="city.cityId" />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "City",
  computed: {
    ...mapState("city", ["cityList"]),
    // index根据pinyin首字母转为大写
    indexList() {
      let tempArr = [];
      for (let i = 0; i < 26; i++) {
        let letter = String.fromCharCode(97 + i).toUpperCase();
        tempArr.push(letter);
      }
      return tempArr;
    },
    // 将城市数据重构成二维数组[{list:[{},{}],type:"A"},{...}]
    rebuildCityList() {
      let tempArr = [];
      //   添加字母
      this.indexList.forEach(item => {
        let sameLetterData = this.cityList.filter(
          city => item === city.pinyin.substring(0, 1).toUpperCase()
        );
        tempArr.push({ type: item, list: sameLetterData });
      });
      return tempArr;
    }
  },
  created() {
    this.getCityList();
  },
  mounted(){
    //   首次进入时挂载到的点
      this.$refs.indexBar.scrollTo("A");
  },
  methods: {
    ...mapActions("city", ["getCityList"]),
    selectCity(cityId){
        this.$router.push({name:"cinema", params:{cityId}});
    }
  }
};
</script>