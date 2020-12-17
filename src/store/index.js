import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const initStore = new Vuex.Store({
    state: {
        comment: {},
        menu: '',
        // url:'http://172.18.12.148:8080/ftis',  //测试环境
        url:'http://61.181.59.73:28080/ftis',  //预发布环境
        // url:'http://192.168.1.45:8080/ftis', //本地环境
        url2:'http://61.181.59.73:28080',  //预发布环境
        // url2:'http://172.18.12.148:8080',  //测试环境
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
