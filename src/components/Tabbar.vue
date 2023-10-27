<template>
  <nav>
    <ul>
      <router-link :to="{name:'nowplaying'}" tag="li" active-class="active">
        <i class="iconfont icon-training"></i>
        <span>电影</span>
      </router-link>
      <router-link :to="{name:'cinema'}" tag="li" active-class="active">
        <i class="iconfont icon-all"></i>
        <span>影院</span>
      </router-link>
      <router-link  :to="{name:'login'}" tag="li" active-class="active">
        <i class="iconfont icon-account"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Tabbar"
};
</script>
<style lang="less" scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 25px;
  text-align: center;
  background-color: #fff;
  z-index: 99;
  font-size: 12px;

  .active {
    color: red;
  }

  ul {
    display: flex;
    text-align: center;

    li {
      display: flex;
      flex: 1;
      flex-direction: column;
      i{
        font-size: 20px;
      }
    }
  }
}
</style>