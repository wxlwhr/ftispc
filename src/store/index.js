import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const initStore = new Vuex.Store({
    state: {
        comment: {},
        menu: '',
        url:'http://172.18.12.148:8080/ftis',
        RealnameStatus:'',
        userIfor:'',
        auditManager:'',
	},
    modules:{},
    getters:{},
    mutations:{
        // 动态导航
        setMenu(state, data){
            state.menu = data
        },
    },
    actions:{}
})



export default initStore
