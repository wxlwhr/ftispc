import { request, requestFd } from '../core/request.js'
import axios from 'axios'
const url = 'http://172.18.12.148:8080/ftis'   //测试环境
// const url = 'http://192.168.21.14:8080/ftis'   //本地环境
// const url = 'http://192.168.1.130:8080/ftis'   //本地环境
// const url = '/api'   //本地环境
// export function geturl(){
//     let a='http://172.18.12.148:8080/ftis'
//     console.log(url)
// return url
// }
//获取token
function getToken() {
    return window.localStorage.getItem("Authorization");
}
// 登录请求
export function loginFunction(params) {
    console.log('登录请求')
    return request({
        url: url + '/user/login/account',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 登录页短信验证码
export function loginMobilereg(params) {
    console.log('登录短信请求')
    return request({
        url: url + '/vericode/mobilelogin',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 登录页短信验证登录
export function loginMobile(params) {
    console.log('登录请求')
    return request({
        url: url + '/user/login/vericode',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 注册新用户请求
export function addNewUser(params) {
    console.log('注册请求')
    return request({
        url: url + '/user/register',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 注册页面手机短信验证码请求
export function sendMobilereg(params) {
    console.log('注册短信请求')
    return request({
        url: url + '/vericode/mobilereg',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//注册页面邮箱验证码请求
export function sendEmailreg(params) {
    console.log('邮箱验证码请求')
    return request({
        url: url + '/vericode/emailreg',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 忘记密码页面 短信验证码获取
export function sendMobilepasswd(params) {
    console.log('忘记密码短信请求')
    return request({
        url: url + '/vericode/mobilepasswd',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 忘记密码 获取随机密码
export function randomPasswd(params) {
    console.log('随机密码')
    return request({
        url: url + '/user/random/password',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 修改密码
export function changePasswd(params) {
    console.log('修改密码')
    return request({
        url: url + '/user/password',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 修改个人资料页面--手机号变更--获取短信验证码
export function changephonenumvericode(params) {
    console.log('手机号变更短信请求')
    return request({
        url: url + '/vericode/mobilechange',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 修改个人资料--邮箱变更--获取邮箱验证码
export function changeemailvericode(params) {
    console.log('邮箱变更验证码请求')
    return request({
        url: url + '/vericode/emailchange',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 修改个人资料--手机号变更
export function changephonenum(params) {
    console.log('手机号变更请求')
    return request({
        url: url + '/user/mobile',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 修改个人资料--邮箱变更
export function changeemail(params) {
    console.log('邮箱变更请求')
    return request({
        url: url + '/user/email',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 修改个人资料
export function changeUserIfor(params) {
    console.log('用户个人资料变更请求')
    return request({
        url: url + '/user/userinfo',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 消息页面--未读消息--数据请求    
export function msgUnreadList(params) {
    console.log('消息未读列表请求')
    return request({
        url: url + '/t00_int_msg/query_no_read.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 消息页面--已读消息--数据请求    
export function msgReadList(params) {
    console.log('消息已读列表请求')
    return request({
        url: url + '/t00_int_msg/query_is_read.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 消息页面--标记已读   
export function markMsg(params) {
    console.log('标记已读消息请求')
    return request({
        url: url + '/t00_int_msg/updateT00_int_msg_is_read_to_yes',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 消息页面--消息删除    
export function deleteMsg(params) {
    console.log('删除消息请求')
    return request({
        url: url + '/t00_int_msg/delT00_int_msg',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//菜单管理页面--获取菜单树
export function getTree(params) {
    console.log('获取菜单树请求')
    return request({
        url: url + '/tree/moduletree',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//菜单管理页面--新增子菜单
export function addSonMenu(params) {
    console.log('新增子菜单请求')
    return request({
        url: url + '/t00_module/addT00_module',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//菜单管理页面--获取菜单列表
export function getMenuList(params) {
    console.log('菜单列表请求')
    return request({
        url: url + '/t00_module/getT00_module_by_parent_id',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//菜单管理页面--删除菜单
export function deleteMenu(params) {
    console.log('删除菜单请求')
    return request({
        url: url + '/t00_module/delT00_module',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//菜单管理页面--修改菜单
export function changeMenu(params) {
    console.log('修改菜单')
    return request({
        url: url + '/t00_module/updateT00_module',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//菜单管理页面--修改菜单排序
export function changeMenuOrder(params) {
    console.log('修改菜单排序')
    return request({
        url: url + '/t00_module/batchUpdate_T00_module_seq',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 下拉框数据请求
export function getSelectData(params) {
    console.log('获取下拉框请求')
    return request({
        url: url + '/cache/select',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//认证页面--获取认证状态
export function getRealnameAuthstatus(params) {
    console.log('获取认证状态请求')
    return request({
        url: url + '/realname/authstatus',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--个人实名认证
export function getRealnamePersonal(params) {
    console.log('获取个人实名认证')
    return request({
        url: url + '/realname/personal',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//认证页面--获取个人基本信息（姓名.身份证号）
export function getRealnamePersonalInfo(params) {
    console.log('获取个人信息')
    return request({
        url: url + '/realname/personal/info',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--获取个人机构实名认证基本信息（已有机构实名认证 信息回显）
export function getRealnameOrganInfo(params) {
    console.log('获取个人信息')
    return request({
        url: url + '/user/userinfo',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--选择已有企业
export function getRealnameOrganOption(params) {
    console.log('已有企业下拉列表')
    return request({
        url: url + '/realname/organ/option',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--提交认证信息
export function getRealnamePersonalOrgan(params) {
    console.log('提交认证信息')
    return request({
        url: url + '/realname/personal/organ',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//认证页面--新增企业信息
export function getRealnameOrgan(params) {
    console.log('新增企业信息')
    return request({
        url: url + '/realname/organ',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//认证页面--授权资料模板下载
export function getRealnameAuthtemplate(params) {
    console.log('授权资料模板下载')
    return request({
        url: url + '/realname/authtemplate',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
export function downloadFile(name) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        var url = url + "/realname/authtemplate"
        xhr.open('GET', url, true) // 也可以使用POST方式，根据接口
        xhr.setRequestHeader('token', getToken())
        xhr.responseType = 'blob' // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑

        xhr.onload = function (response) {
            console.log(response);
            // 请求完成
            if (this.status === 200) {
                // console.log(xhr.getResponseHeader("Content-Disposition"))
                // xhr.getResponseHeader("Content-Disposition")
                // 返回200
                var blob = this.response
                var reader = new FileReader()
                reader.readAsDataURL(blob) // 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement('a')
                    a.download = name
                    a.href = e.target.result
                    a.click()
                    resolve(200)
                }
            }
        }
        // 发送ajax请求
        xhr.send()
    })
}
//认证页面--获取认证类型
export function getRealnameAuthtype(params) {
    console.log('获取认证类型')
    return request({
        url: url + '/realname/authtype',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--获取最后一次被拒绝的机构认证记录（新建机构实名认证 信息回显调用）
export function getRealnameOrganLastlog(params) {
    console.log('获取最后一次被拒绝的机构认证记录')
    return request({
        url: url + '/realname/organ/lastlog',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//认证页面--机构是否存在或在审核中
export function getRealnameOrganExist(params) {
    console.log('机构是否存在或在审核中')
    return request({
        url: url + '/realname/organ/exist',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--获取待审核机构管理员列表
export function getListManagerAudit(params) {
    console.log('获取待审核机构管理员列表')
    return request({
        url: url + '/user/list/manager/audit',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--获取审核通过机构管理员列表
export function getListManagerPass(params) {
    console.log('获取审核通过机构管理员列表')
    return request({
        url: url + '/user/list/manager/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--获取审核拒绝机构管理员列表
export function getListManagerReject(params) {
    console.log('获取审核拒绝机构管理员列表')
    return request({
        url: url + '/user/list/manager/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--机构管理员管理 详情页
export function managerDetail(params) {
    console.log('机构管理员管理 详情页')
    return request({
        url: url + '/user/info/manager',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--审核机构管理员通过
export function auditPass(params) {
    console.log('审核机构管理员通过')
    return request({
        url: url + '/user/audit/manager/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）用户管理--审核机构管理员拒绝
export function auditReject(params) {
    console.log('审核机构管理员拒绝')
    return request({
        url: url + '/user/audit/manager/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// (协会端)用户管理--机构用户管理（获取机构用户列表）
export function getOrganUserList(params) {
    console.log(url)
    console.log('用户管理--获取机构用户列表')
    return request({
        url: url + '/transmanager/list/organ/user',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// (协会端)用户管理--机构用户管理（审核通过 转让为机构管理员）
export function getManagerPass(params) {
    console.log('用户管理--通过转让管理员')
    return request({
        url: url + '/transmanager/audit/tomanager/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// (协会端)用户管理--机构用户管理（审核拒绝 转让为机构管理员）
export function getManagerReject(params) {
    console.log('用户管理--拒绝转让管理员')
    return request({
        url: url + '/transmanager/audit/manager/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// (协会端)用户管理--机构用户管理（设置用户为机构管理员）
export function setasManager(params) {
    console.log('用户管理--设置用户为机构管理员')
    return request({
        url: url + '/transmanager/setasmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// (协会端)用户管理--机构用户管理（获取转让信息）
export function transinfo(params) {
    console.log('用户管理--设置用户为机构管理员')
    return request({
        url: url + '/transmanager/transinfo',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
//（协会端） 审核转让管理员授权书下载
export function downloadAttachmentId(attachmentId) {
    let url1 = url + "/attach/binary" //请求下载文件的地址
    let token = getToken()  //获取token
    console.log(url1, token)
    axios
        .get(url1, {
            headers: {
                token: token
            },
            params: {
                attachmentId: attachmentId
            },
            responseType: "blob"
        })
        .then(res => {
            if (!res) return;
            let blob = new Blob([res.data], {
                type: "application/vnd.ms-excel;charset=utf-8"
            });
            let url = window.URL.createObjectURL(blob);
            let aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            aLink.setAttribute("download", "xxx.docx"); // 下载的文件
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            this.$message.error(error);
        });


}
// （机构端）用户管理--获取待审核 列表
export function getAuditList(params) {
    console.log('用户管理--获取待审核列表')
    return request({
        url: url + '/user/list/audit',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--获取通过列表
export function getPassList(params) {
    console.log('用户管理--获取通过列表')
    return request({
        url: url + '/user/list/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--获取被拒绝 列表
export function getRejectList(params) {
    console.log('用户管理--获取被拒绝列表')
    return request({
        url: url + '/user/list/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--通过
export function getPassUser(params) {
    console.log('用户管理--通过')
    return request({
        url: url + '/user/audit/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--拒绝
export function getRejectUser(params) {
    console.log('用户管理--拒绝')
    return request({
        url: url + '/user/audit/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--1.10.9删除机构用户
export function getRemoveUser(params) {
    console.log('用户管理--删除')
    return request({
        url: url + '/user/remove',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）用户管理--转让管理员
export function getTransferManager(params) {
    console.log('用户管理--转让管理员')
    return request({
        url: url + '/user/transfer/manager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 转让管理员授权书模板下载
export function downloadAuthFile(name) {
    return new Promise((resolve, reject) => {
        console.log(this)
        var xhr = new XMLHttpRequest()
        var url = url + "/user/authtemplate"
        // var token =this.$store.token
        // console.log(token)
        xhr.open('GET', url, true) // 也可以使用POST方式，根据接口
        xhr.setRequestHeader('X-Token', getToken())

        xhr.responseType = 'blob' // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑

        xhr.onload = function (response) {
            console.log(response);
            // 请求完成
            if (this.status === 200) {
                // console.log(xhr.getResponseHeader("Content-Disposition"))
                // xhr.getResponseHeader("Content-Disposition")
                // 返回200
                var blob = this.response
                var reader = new FileReader()
                reader.readAsDataURL(blob) // 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement('a')
                    a.download = name
                    a.href = e.target.result
                    a.click()
                    resolve(200)
                }
            }
        }
        // 发送ajax请求
        xhr.send()
    })
}
// 机构信息变更--变更记录下拉框 时间记录
export function getSltChangeData(params) {
    console.log('变更记录下拉框')
    return request({
        url: url + '/organ/option/changedate',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 机构信息变更--获取机构基本信息
export function getOrganInfo(params) {
    console.log('获取机构基本信息')
    return request({
        url: url + '/organ/info',
        method: 'get',
        params: params,
        showLoading: 'true'
    })
}
// 机构信息变更--申请变更
export function getApplyChange(params) {
    console.log('申请变更')
    return request({
        url: url + '/organ/apply/change',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//角色管理--删除角色
export function delOrgRole(params) {
    console.log('删除平台角色')
    return request({
        url: url + '/t00_role/delT00_role',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--获取平台角色
export function getOrgRole(params) {
    console.log('获取平台角色')
    return request({
        url: url + '/t00_role/queryRole_organ.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--添加平台角色
export function addOrgRole(params) {
    console.log('添加平台角色')
    return request({
        url: url + '/t00_role/addT00_role_organ',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--修改平台角色
export function updateOrgRole(params) {
    console.log('修改平台角色')
    return request({
        url: url + '/t00_role/updateT00_role',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--修改机构角色
export function updateAdinmRole(params) {
    console.log('修改机构角色')
    return request({
        url: url + '/t00_role/updateT00_role_platform',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--获取管理员角色
export function getAdminRole(params) {
    console.log('获取平台角色')
    return request({
        url: url + '/t00_role/queryRole_platform.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--添加管理员角色
export function addAdminRole(params) {
    console.log('添加平台角色')
    return request({
        url: url + '/t00_role/addT00_role_platform',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--添加角色和菜单的关联关系数据
export function addRoleModule(params) {
    console.log('添加角色和菜单的关联关系数据')
    return request({
        url: url + '/t00_role/addT00_role_module',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//角色管理--根据角色获取机构的菜单
export function getRoleByRoleId(params) {
    console.log('根据角色获取机构的菜单')
    return request({
        url: url + '/t00_role/queryRole_by_role_id.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 权限管理(权限申请)--获取权限申请列表
export function getRoleList(params) {
    console.log('获取权限申请列表')
    return request({
        url: url + '/role/apply/rolelist.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 权限管理(权限申请)--1.11.3角色申请-角色申请 
export function roleApply(params) {
    console.log('获取角色权限申请')
    return request({
        url: url + '/role/apply/apply',
        method: 'post',
        data: params,
        showLoading: 'true',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 权限管理(权限申请)--1.11.3角色申请-角色申请 
export function downloadRoleFile(name) {
    return new Promise((resolve, reject) => {
        console.log(this)
        var xhr = new XMLHttpRequest()
        var url = url + "/role/apply/authfile"
        // var token =this.$store.token
        // console.log(token)
        xhr.open('GET', url, true) // 也可以使用POST方式，根据接口
        xhr.setRequestHeader('X-Token', getToken())

        xhr.responseType = 'blob' // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑

        xhr.onload = function (response) {
            console.log(response);
            // 请求完成
            if (this.status === 200) {
                // console.log(xhr.getResponseHeader("Content-Disposition"))
                // xhr.getResponseHeader("Content-Disposition")
                // 返回200
                var blob = this.response
                var reader = new FileReader()
                reader.readAsDataURL(blob) // 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement('a')
                    a.download = name
                    a.href = e.target.result
                    a.click()
                    resolve(200)
                }
            }
        }
        // 发送ajax请求
        xhr.send()
    })
}
//获取管理员角色列表
export function getUserRole(params) {
    console.log('获取管理员角色列表')
    return request({
        url: url + '/user/list/platform/role',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


//获取机构用户角色列表
export function getOrganRole(params) {
    console.log('获取机构用户角色列表')
    console.log(params)
    return request({
        url: url + '/user/list/organ/role',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


//获取待审核的机构用户角色申请列表
export function getAudit(params) {
    console.log('获取待审核的机构用户角色申请列表')
    return request({
        url: url + '/user/list/roleapply/audit',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


//获取审核通过的机构角色申请列表数据
export function getPass(params) {
    console.log('获取审核通过的机构角色申请列表数据')
    return request({
        url: url + '/user/list/roleapply/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


//获取审核拒绝的机构角色申请列表数据
export function getReject(params) {
    console.log('获取审核拒绝的机构角色申请列表数据')
    return request({
        url: url + '/user/list/roleapply/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//机构角色申请审核通过
export function pass(params) {
    console.log('机构角色申请审核通过')
    return request({
        url: url + '/user/audit/roleapply/pass',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//机构角色申请审核拒绝
export function noPass(params) {
    console.log('机构角色申请审核拒绝')
    return request({
        url: url + '/user/audit/roleapply/reject',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//获取平台管理员列表
export function getAdminUser(params) {
    console.log('获取平台管理员列表')
    return request({
        url: url + '/user/list/platform/userandrole',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

//管理角色关联管理员用户
export function subRoleAndUser(params) {
    console.log('管理角色关联管理员用户')
    return request({
        url: url + '/user/check/userandrole',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
//获取机构用户列表
export function getOrganUser(params) {
    console.log('获取机构用户列表')
    return request({
        url: url + '/user/list/organ/userandrole',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// 钱万龙
// （协会端）披露认证管理--专题列表
export function getSearchSubjectList(params) {
    return request({
        url: url + '/subject/searchSubjectList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--添加专题
export function addSearchSubject(params) {
    return request({
        url: url + '/subject/insertSubject.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--编辑专题
export function editSearchSubject(params) {
    return request({
        url: url + '/subject/updateSubject.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--删除专题
export function delSearchSubject(params) {
    return request({
        url: url + '/subject/deleteSubject.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--技术列表
export function getSearchTechnologyList(params) {
    return request({
        url: url + '/technology/searchTechnologyList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--添加技术
export function addTechnology(params) {
    return request({
        url: url + '/technology/insertTechnology.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--编辑技术
export function editTechnology(params) {
    return request({
        url: url + '/technology/updateTechnology.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （协会端）披露认证管理--删除技术
export function deleteTechnology(params) {
    return request({
        url: url + '/technology/deleteTechnology.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 获取专题目录树
export function getSubjecttree(params) {
    return request({
        url: url + '/tree/subjecttree',
        method: 'get',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 获取列表
export function getSubCatalogList(params) {
    return request({
        url: url + '/productCatalog/getSubCatalogList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 添加二级菜单
export function insertProductCatalogOne(params) {
    return request({
        url: url + '/productCatalog/insertProductCatalog1.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 修改二级菜单
export function updateProductCatalogOne(params) {
    return request({
        url: url + '/productCatalog/updateProductCatalog1.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 添加三级菜单
export function insertProductCatalogTow(params) {
    return request({
        url: url + '/productCatalog/insertProductCatalog2.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 修改三级菜单
export function updateProductCatalogTow(params) {
    return request({
        url: url + '/productCatalog/updateProductCatalog2.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 获取三级菜单详情
export function getSubCatalogByCatalogId(params) {
    return request({
        url: url + '/productCatalog/getSubCatalogByCatalogId.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--业务场景 删除菜单
export function deleteProductCatalog(params) {
    return request({
        url: url + '/productCatalog/deleteProductCatalog.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// （机构端）披露认证管理--证书列表
export function getSearchCertificateList(params) {
    return request({
        url: url + '/certificate/searchCertificateList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--添加证书
export function insertCertificate(params) {
    return request({
        url: url + '/certificate/insertCertificate.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


// （机构端）披露认证管理--修改证书
export function updateCertificate(params) {
    return request({
        url: url + '/certificate/updateCertificate.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--删除证书
export function deleteCertificateInfo(params) {
    return request({
        url: url + '/certificate/deleteCertificateInfo.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--证书详情
export function getCertificateInfo(params) {
    return request({
        url: url + '/certificate/getCertificateInfo.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--专利列表
export function getSearchPatentList(params) {
    return request({
        url: url + '/patent/searchPatentList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--业务场景 添加专利
export function insertPatent(params) {
    return request({
        url: url + '/patent/insertPatent.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}


// （机构端）披露认证管理--修改专利
export function updatePatent(params) {
    return request({
        url: url + '/patent/updatePatent.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--删除专利
export function deletePatentInfo(params) {
    return request({
        url: url + '/patent/deletePatentInfo.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （机构端）披露认证管理--专利详情
export function getPatentInfo(params) {
    return request({
        url: url + '/patent/getPatentInfo.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--认证机构管理
export function getSearchAuthOrganList(params) {
    return request({
        url: url + '/authOrgan/searchAuthOrganList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--认证机构管理 选择机构列表
export function getSearchNoAuthOrganList(params) {
    return request({
        url: url + '/authOrgan/searchNoAuthOrganList.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--认证机构管理 添加关联
export function insertAuthOrgan(params) {
    return request({
        url: url + '/authOrgan/insertAuthOrgan.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--认证机构管理 移除关联
export function deleteAuthOrgan(params) {
    return request({
        url: url + '/authOrgan/deleteAuthOrgan.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 获取目录树
export function getCaseTreeList(params) {
    return request({
        url: url+'/caseCatalog/getCaseTreeList.ajax',
        method: 'get',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 获取目录树下的列表
export function getCaseSubCatalogList(params) {
    return request({
        url: url+'/caseCatalog/getSubCatalogList.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 添加二级菜单
export function insertCaseCatalogOne(params) {
    return request({
        url: url+'/caseCatalog/insertCaseCatalog1.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 添加三级菜单
export function insertCaseCatalogTow(params) {
    return request({
        url: url+'/caseCatalog/insertCaseCatalog2.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 修改目录
export function updateCaseCatalogOne(params) {
    return request({
        url: url+'/caseCatalog/updateCaseCatalog1.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案目录管理 删除目录
export function deleteCaseCatalog(params) {
    return request({
        url: url+'/caseCatalog/deleteCaseCatalog.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 获取解决方案列表
export function getSearchCaseByCatalog(params) {
    return request({
        url: url+'/case/searchCaseByCatalog.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 获取解决方案未关联列表
export function getProductCaseNORelListByCase(params) {
    return request({
        url: url+'/productCase/getProductCaseNORelListByCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 添加 解决方案
export function insertCase(params) {
    return request({
        url: url+'/case/insertCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 修改 解决方案
export function updateCase(params) {
    return request({
        url: url+'/case/updateCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 删除 解决方案
export function deleteCase(params) {
    return request({
        url: url+'/case/deleteCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 解决方案详情
export function searchCaseByCaseId(params) {
    return request({
        url: url+'/case/searchCaseByCaseId.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）披露认证管理--解决方案披露 获取解决方案已关联列表
export function getProductCaseRelListByCase(params) {
    return request({
        url: url+'/productCase/getProductCaseRelListByCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}


// （协会端）披露认证管理--解决方案披露 获取解决方案 添加关联案件
export function insertProductCaseProduct(params) {
    return request({
        url: url+'/productCase/insertCaseProduct.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}


// （协会端）披露认证管理--解决方案披露 删除已关联的产品
export function deleteProductCase(params) {
    return request({
        url: url+'/productCase/deleteProductCase.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}


// （协会端）开源软件管理 开源目录树
export function getOpenSourceCatalogTree(params) {
    return request({
        url: url+'/openSourceCatalog/getOpenSourceCatalogTree.ajax',
        method: 'get',
        data: params,
        showLoading:'true'
    })
}

// （协会端）开源软件管理 查询目录树下的列表
export function getOpenSubCatalogList(params) {
    return request({
        url: url+'/openSourceCatalog/getSubCatalogList.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）开源软件管理 添加开源目录
export function insertOpenSourceCatalog(params) {
    return request({
        url: url+'/openSourceCatalog/insertOpenSourceCatalog.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）开源软件管理 修改开源目录
export function updateOpenSourceCatalog(params) {
    return request({
        url: url+'/openSourceCatalog/updateOpenSourceCatalog.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// （协会端）开源软件管理 删除开源目录
export function deleteOpenSourceCatalog(params) {
    return request({
        url: url+'/openSourceCatalog/deleteOpenSourceCatalog.ajax',
        method: 'post',
        data: params,
        showLoading:'true'
    })
}

// 平台管理员管理--（获取平台管理员列表）
export function getPlatformmanager(params) {
    console.log('获取平台管理员列表')
    return request({
        url: url + '/user/list/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(新建平台管理员账号)
export function createPlatformmanager(params) {
    console.log('新建平台管理员账号')
    return request({
        url: url + '/user/create/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(禁用平台管理员账号)
export function disablePlatformmanager(params) {
    console.log('禁用平台管理员列表')
    return request({
        url: url + '/user/disable/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(启用平台管理员用户)
export function enablePlatformmanager(params) {
    console.log('启用平台管理员用户')
    return request({
        url: url + '/user/enable/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(修改平台管理员用户信息)
export function modifyPlatformmanager(params) {
    console.log('修改平台管理员用户信息')
    return request({
        url: url + '/user/modify/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(获取平台管理员角色列表)
export function grantrolelistPlatformmanager(params) {
    console.log('平台管理员分配角色')
    return request({
        url: url + '/user/rolelist/platformmanager.ajax',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(平台管理员分配角色)
export function grantrolePlatformmanager(params) {
    console.log('平台管理员分配角色')
    return request({
        url: url + '/user/grantrole/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 平台管理员管理--(重置平台管理员密码)
export function resetpasswordPlat(params) {
    console.log('重置平台管理员密码')
    return request({
        url: url + '/user/resetpassword/platformmanager',
        method: 'post',
        data: params,
        showLoading: 'true'
    })
}
// 机构信息变更--
// export function getToken(params) {
//     return request({
//         url: url+`/user/login/account`,
//         method: 'post',
//         data: params
//     })
// }
