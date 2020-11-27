// 未认证 表单校验
export function unvalidateOrganUscc  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入统一社会信用代码"));
    } else {
        callback();
    }
};
export function unvalidateOrganType  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请选择机构类型"));
    } else {
        callback();
    }
};
export function unvalidateOrganName(rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入机构全称"));
    } else {
        callback();
    }
};
export function unvalidateOrganMoney  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入注册资本"));
    } else {
        callback();
    }
};
export function unvalidateLegalname  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入法人姓名"));
    } else {
        callback();
    }
};
export function unvalidateLegalcode  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入法人身份证号"));
    } else {
        callback();
    }
};
export function unvalidateFounddate  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入成立时间"));
    } else {
        callback();
    }
};
export function unvalidateValid  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请选择有效期"));
    } else {
        callback();
    }
};
export function unvalidateCertificate  (rule, value, callback) {
    if (!value) {
        callback(new Error("请选择营业执照"));
    } else {
        callback();
    }
};
export function unvalidateLogo  (rule, value, callback) {
    if (!value) {
        callback(new Error("请选择机构logo"));
    } else {
        callback();
    }
};
export function unvalidateDepartment  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入所在部门"));
    } else {
        callback();
    }
};
export function unvalidatePosition  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入职务"));
    } else {
        callback();
    }
};
export function unvalidateTelephone  (rule, value, callback) {
    if (value === "") {
        callback(new Error("请输入座机"));
    } else {
        callback();
    }
};
export function unvalidateAuthmaterial (rule, value, callback) {
    if (!value) {
        callback(new Error("请选择授权材料"));
    } else {
        callback();
    }
};
// department: [
//     { required: true, validator: unvalidateDepartment, trigger: "blur" },
//   ],
//   position: [
//     { required: true, validator: unvalidatePosition, trigger: "blur" },
//   ],
//   telephone: [
//     { required: true, validator: unvalidateTelephone, trigger: "blur" },
//     {
//       min: 3,
//       max: 11,
//       message: "长度在 3 到 11 个数字",
//       trigger: "blur",
//     },
//   ],
