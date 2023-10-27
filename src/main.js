import Vue from 'vue'
import App from './App.vue'
import router from "@/router/index"
import { Tabbar, TabbarItem, NavBar , List,Cell, Toast, 
  Icon,Image as VanImage,IndexBar, IndexAnchor,Search } from 'vant';
import store from "@/store/index"
// 必须加，否则vant ui的样式效果都出不来
import 'vant/lib/index.less'

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(List);
Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(VanImage);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
