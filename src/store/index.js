import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const initStore = new Vuex.Store({
    state: {
        comment: {},
        menu: '',
        token:'',
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
        // 认证状态
        setRealnameStatus(state,data){
            state.RealnameStatus=data
        },
        // 修改个人资料
        setUserIfor(state,data){
            state.userIfor=data
        },
        // 待审核用户个人信息传递
        setAuditManager(state,data){
            state.auditManager=data
        },
        // 设置token
        setToken(state,data){
            state.token=data
        }
    },
    actions:{}
})



export default initStore
