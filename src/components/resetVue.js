//resetVue.js
// 全局组件注册
import Tree from './tree' //tree组件
import SideBar from './sidebar' //leftSide
import Select from './select' //select下拉菜单
import GTabs from './GTabs.vue' //tabs组件
import Dialog from './normaldialog.vue' //弹出框
import Slt from './slt.vue' //select下拉选框
import treeCheck from './treeCheck.vue' //tree组件

// import Btn from './btn' //btn
// import Cascade from './cascader-all' //cascade级联
// import Search from './search' //search
// import Page from '../components/pagination' //Page
export default {
    install: (Vue)=>{
        Vue.component('SideBar', SideBar);
        Vue.component('Tree', Tree);
        Vue.component('GTabs', GTabs);
        Vue.component('new-select',Select);
        Vue.component('Dialog',Dialog);
        Vue.component('Slt',Slt);
        Vue.component('treeCheck',treeCheck);
    },
}
//         Vue.component('new-btn', Btn);
//         Vue.component('new-cascade', Cascade);
//         Vue.component('new-search', Search);
//         Vue.component('new-page', Page);