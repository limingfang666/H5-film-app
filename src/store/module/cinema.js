import { getCinemalData } from "@/api/index"
import { to } from "await-to-js";
import { Toast } from "vant";

const state = {
    cinemaList: JSON.parse(JSON.stringify(localStorage.getItem("Cinema") || '[]'))
}

const getters = {
    searchCinemaList(state){
        return function(payload){
            if(payload==='') return [];
            return state.cinemaList && state.cinemaList.filter(item=>{
                if(item.name.includes(payload)) return item;
            } );
        }
    }
}

const mutations = {
    addCinemaList(state, payload) {
        state.cinemaList = payload;
    }
}

const actions = {
    async getCinemaList({ commit }, payload) {
        const [err, { data = {} } = {}] =
            (await to(getCinemalData(payload))) || [];
        if (err) return Toast.fail("加载出错");
        commit("addCinemaList", data.cinemas);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}