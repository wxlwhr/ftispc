/* eslint no-undef: 0 */
import axios from 'axios'
import qs from 'qs'
import router from '@/router/index';
import store from '@/store/index'
import { Message } from 'element-ui'

// import {
//   showFullScreenLoading,
//   tryHideFullScreenLoading,
// } from './loading'

// const apiBaseUrl = 'http://172.18.12.148:8080/ftis'
// 默认配置
axios.defaults.timeout = 10000
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

// 普通请求实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_ROUTER,
  maxRedirects: 0
})

// form-data类型请求实例
const requestFd = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_ROUTER,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function (data) {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object') {
          data[key] = JSON.stringify(data[key])
        }
      })
      return qs.stringify(data)
    }
  ]
})

/**
 * 拦截器成功回调
 * 所有接口返回0才正常返回resolve
 * 非0都reject出去
 * @param res
 * @returns {*}
 */
function resolve(res) {
  //返回结果，说明请求结束，关闭loading
  // console.log(res)
  // if (res.config.showLoading) {
  //   tryHideFullScreenLoading()
  // }
  const data = res.data || {}
  if (res.status === 200) {

    // if (res.data.code !== 1) {
    //   Message({
    //     message: res.data.des,
    //     type: 'warning',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.resolve(data);
  } else {

    return Promise.reject(data);
  }

}

// 失败(网络错误)
function reject(error) {
  console.log(error.response)
  // 请求返回错误码时，关闭loading
  //   tryHideFullScreenLoading()

  // if (error.response) {
  //   const { status, config, data } = error.response
  //   if (status === 400 && config.url.indexOf('/api/user/login/account') !== -1 || status === 401 || status === 403) {
  //     // store.dispatch('user/logout')
  //     // store.dispatch('user/logout')

  //     error.message = '请求错误'
  //   } else {
  //     return data
  //   }
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  // } else {
  //   if (error.message.indexOf('timeout') !== -1) {
  //     error.message = '网络请求超时'
  //   }
  //   if (error.message.indexOf('Network') !== -1) {
  //     error.message = '网络异常'
  //   }
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })

  //   return Promise.reject(error)
  // }
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误(400)'; break;
      case 401: error.message = '未授权,请登录(401)'; break;
      case 403: error.message = '拒绝访问(403)'; break;
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
      case 405: error.message = '请求方法未允许(405)'; break;
      case 408: error.message = '请求超时(408)'; break;
      case 500: error.message = '服务器内部错误(500)'; break;
      case 501: error.message = '服务未实现(501)'; break;
      case 502: error.message = '网络错误(502)'; break;
      case 503: error.message = '服务不可用(503)'; break;
      case 504: error.message = '网络超时(504)'; break;
      case 505: error.message = 'HTTP版本不受支持(505)'; break;
      default: error.message = `连接错误: ${error.message}`;
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    error.message = '连接服务器失败，请联系管理员'
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
  }

  // if (!errFlag) {
  //   errFlag = true;
  //   // 用户未登录时，跳转到登录页
  //   Vue.prototype.$alert(error.message, '警告', {
  //     confirmButtonText: '确定',
  //     callback: action => {
  //       // 用户未登录时，跳转到登录页 ，根据实际情况修改
  //       if (localStorage.getItem("user") == null) {
  //         router.push('/');
  //       }

  //     }
  //   });
  //   return;
  // }

  return Promise.reject(error)
}
// 请求拦截
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 这里写一个loading
  // if (config.showLoading) {
  //   showFullScreenLoading()
  // }
  //Token验证
  // if (store.getters.token && config.url !== '/auth/oauth/check_token') {
  //   config.headers['Authorization'] = 'Bearer ' + getToken()
  //   // config.headers['Authorization'] = 'Basic YW1hemluZ2xhbmQ6YW1hemluZ2xhbmQ='
  // } else {
  //   config.headers['Authorization'] = process.env.VUE_APP_BASIC_TOKEN
  // }
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  const token = localStorage.getItem("Authorization");
  config.headers.token = `${token}`;
  return config
})

request.interceptors.response.use(resolve, reject)
requestFd.interceptors.response.use(resolve, reject)

export { request, requestFd }
