import request from '@/utils/request'

export function loginByUsername(username, password) {
  var params = {
    loginName: username,
    loginPasswd: password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function logout() {
  return request({
    url: '/basic/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/basic/customConfig/userInfo',
    method: 'post'
  })
}
