
import { getCityData } from "@/api/index"
import { to } from "await-to-js";
import { Toast } from "vant";

const state = {
    cityList: []
}

const getters = {

}

const mutations = {
    addCityList(state, payload) {
        state.cityList = payload;
    }
}

const actions = {
    async getCityList({ commit }) {
        const [err, { data = {} } = {}] =
            (await to(getCityData())) || [];
        if (err) return Toast.fail("加载出错");
        commit("addCityList", data.cities);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}