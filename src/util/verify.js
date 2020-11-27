/**
 * 判断是否为空
 * @method validatenull
 * @param {any} val
 * @returns {Boolean}
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    // eslint-disable-next-line eqeqeq
    if (val.length == 0) {
      return true
    }
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') {
      return true
    }
  } else {
    if (
      val === 'null' ||
      val === null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true
    }
    return false
  }
  return false
}

/**
 * 判断字符串是否为空，主要校验输入时是否有长度，并且有效
 * @method valid
 * @param {String} val
 * @returns {Object}
 */
export function valid(val) {
  const list = {
    result: true,
    msg: [],
    value: undefined
  }
  if (typeof val === 'string') {
    if (val && val.trim() && val.trim().length > 0) {
      list.result = true
      list.value = val.trim()
    } else {
      list.msg.push('无效')
      list.result = false
    }
  } else {
    list.msg.push('必须为字符串格式')
    list.result = false
  }
  return list
}

/**
 * 判断手机号码是否正确
 * @param phone
 * @returns {Object}
 */
export function validatemobile(rule, phone, callback) {
  // const isPhone = /^0\d{2,3}-?\d{7,8}$/
  const isPhone = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (!isPhone.test(phone)) {
        return callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    } else {
      return callback(new Error('手机号码长度不为11位'));
    }
  } else {
    return callback(new Error('手机号码不能为空'));
  }
}

/**
 * 校验邮箱
 * @param email
 * @returns {Object}
 */
export function regularEmail(rule, email, callback) {
  // eslint-disable-next-line no-useless-escape
  const re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (!validatenull(email)) {
    if (re.test(email)) {
      callback();
    } else {
      return callback(new Error('邮箱格式不正确'));
    }
  } else {
    return callback(new Error('邮箱不能为空'));
  }
}

// 校验身份证号码正确性
export function validateId(rule, value, callback) {
  const regEn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!regEn.test(value)) {
    callback(new Error('身份证号码不能为空'))
  } else {
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
    // 下面分别分析出生日期和校验位
    let num = value.toUpperCase()
    let len, re
    len = num.length
    if (len === 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      let arrSplit = num.match(re) // 检查生日日期是否正确
      let dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      let bGoodDay
      bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        callback(new Error('请输入正确身份证号码'))
      } else { // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var nTemp = 0, i
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
        callback()
      }
    }
    if (len === 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      let arrSplit = num.match(re) // 检查生日日期是否正确
      let dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      let bGoodDay
      bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        callback(new Error('请输入正确身份证号码'))
      } else { // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        let valnum
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var nTemp = 0, i
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]

        if (valnum !== num.substr(17, 1)) {
          callback(new Error('请输入正确身份证号码'))
        } else {
          callback()
        }
      }
    }
  }
}
// 隔行换色
export function tableRowClassName({ row, rowIndex }) {
  if (rowIndex % 2 !== 0) {
    return "blue-row";
  }
  return "";
}