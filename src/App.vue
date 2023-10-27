<template>
  <div id="app">
    <!-- 内容区域 -->
    <router-view></router-view>
    <!-- tabBar区域 -->
    <tabbar v-if="showTabbar"></tabbar>
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar.vue";

export default {
  name: "App",
  components: {
    Tabbar
  },
computed:{
  // 计算属性设置页面是否显示tabBar
  showTabbar(){
    let showTabarArr = ["detail"];
    return !showTabarArr.includes(this.$route.name);
  }
},
};
</script>

<style lang="less">
@import url("../public/iconfont/iconfont.css");
body,
html,
ul,
li,h1,h2,h3,h4,h5,h6,p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html, body{
  height: 100%;
}
</style>
