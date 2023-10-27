import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate"

import cinema from "@/store/module/cinema"
import city from "@/store/module/city"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        cinema,
        city
    },
    plugins:[
        createPersistedState(),
    ]

})

export default store;