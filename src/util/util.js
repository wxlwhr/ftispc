// 假数据
let organlist = [
    {
        id: 1,
        name: "王小虎",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 2,
        name: "Tom",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 3,
        name: "element",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: false
    },
    {
        id: 4,
        name: "name4",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 5,
        name: "five",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: false
    },
    {
        id: 6,
        name: "王小虎",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 7,
        name: "Tom",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: false
    },
    {
        id: 8,
        name: "element",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 9,
        name: "name4",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
    {
        id: 10,
        name: "five",
        organname: "北京某某科技有限公司",
        department: "部门名称",
        duty: "职务",
        applyTime: "2020-09-10 10:10:24",
        isAdmin: true
    },
]

let topiclist = [
    {
        name: '专题一',
        date: '2020年9月29日'
    },
    {
        name: '专题二',
        date: '2020年9月29日'
    },
    {
        name: '专题三',
        date: '2020年9月29日'
    }
]
let userList = [
    {
      user_id: 0,
      mobile: "",
      email: "",
      user_name: "",
      id_code: "",
      realname_status: "",
      department: "",
      user_type: "",
      organ_id: "",
      trans_organ_manage_status: "",
      trans_id: "",
      realname_auth_type: "",
      auth_id: ""
    }
  ]
let roleList = [
    {
      role_name: "",
      role_bel_type:"",
      role_des: "",
      audit_type_disp: "",
      is_open_disp: "",
      audit_type:"",
      source_filename:"",
      target_path:""
    }
  ]
  let adminRoleList = [
    {
      role_name: "",
      role_bel_type:"",
      role_des: "",
      audit_type_disp: "",
      is_open_disp: "",
      audit_type:""
    }
  ]
// 获取当前时间
function date() {
    let nowdate = new Date()

}

export default {
    Organlist: organlist,
    Topiclist: topiclist,
    getDate:date
}



