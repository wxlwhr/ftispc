import { request } from '../core/request.js'
import axios from 'axios'
// const url = 'http://172.18.12.148:8080/ftis'   //测试环境
const url = 'http://192.168.21.14:8080/ftis'   //本地环境
let localtoken = localStorage.getItem('Authorization');
// 入驻机构列表
export function organList(params) {
    console.log('入驻机构列表')
    return request({
        url: url + '/client/page/organ.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 机构详情
export function organDetail(params) {
    console.log('机构详情')
    return request({
        url: url + '/client/organ/intro',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 机构细分场景和相应的产品
export function organProduct(params) {
    console.log('机构详情')
    return request({
        url: url + '/client/organ/menu/products',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 产品树
export function productTree(params) {
    console.log('产品树请求')
    return request({
        url: url + '/tree/producttree',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 产品列表
export function productListData(params) {
    console.log('产品列表')
    return request({
        url: url + '/client/page/product/published.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 产品详情
export function productDetail(params) {
    console.log('产品详情')
    return request({
        url: url + '/client/disp/product',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 提交产品评论
export function productComment(params) {
    console.log('提交产品评论')
    return request({
        url: url + '/client/comment/product',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers:{token:localtoken}
    })
}
// 提交产品咨询
export function productAsk(params) {
    console.log('提交产品咨询')
    return request({
        url: url + '/client/ask/product',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers:{token:localtoken}
    })
}
// 解决方案列表
export function caseList(params) {
    console.log('解决方案列表')
    return request({
        url: url + '/client/page/case/published.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 解决方案tree请求
export function caseTree(params) {
    console.log('解决方案tree请求')
    return request({
        url: url + '/tree/casetree',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 父级菜单获取子菜单
export function caselistbyparent(params) {
    console.log('父级菜单获取子菜单')
    return request({
        url: url + '/client/listbyparent/case',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 解决方案详情
export function caseDetail(params) {
    console.log('解决方案详情')
    return request({
        url: url + '/client/disp/case',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 提交解决方案评论
export function caseComment(params) {
    console.log('提交解决方案评论')
    return request({
        url: url + '/client/comment/case',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers:{token:localtoken}
    })
}
// 提交解决方案咨询
export function caseAsk(params) {
    console.log('提交解决方案咨询')
    return request({
        url: url + '/client/ask/case',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers:{token:localtoken}
    })
}
// 政策信息Tab
export function policyTab(params) {
    console.log('政策信息Tab请求')
    return request({
        url: url + '/client/policy/sidemenu',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 首页政策信息
export function policyIndex(params) {
    console.log('首页政策信息')
    return request({
        url: url + '/client/list/policy.ajax',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 政策列表
export function policyList(params) {
    console.log('政策信息列表')
    return request({
        url: url + '/client/page/policy.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 动态、政策信息详情
export function policyDetail(params) {
    console.log('动态、政策信息详情')
    return request({
        url: url + '/client/disp/content',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 动态发布Tab
export function dynamicTab(params) {
    console.log('动态发布Tab')
    return request({
        url: url + '/client/dynamic/sidemenu',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 动态列表
export function dynamicList(params) {
    console.log('动态列表')
    return request({
        url: url + '/client/page/dynamic.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 机构类型tab
export function getSelectData(params) {
    console.log('获取下拉框请求')
    return request({
        url: url + '/cache/dict',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers:{token:localtoken}

    })
}
