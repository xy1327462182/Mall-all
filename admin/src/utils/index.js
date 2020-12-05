//保存用户登录信息
export const saveUsername = (username) => {
  window.localStorage.setItem('username', username)
}

//获取用户登录信息
export const getUsername = () => {
  return window.localStorage.getItem('username')
}

//删除用户信息
export const delUsername = () => {
  window.localStorage.removeItem('username')
}

//去登录页
export const goLogin = () => {
  window.location.href = '/login'
}

//去后台首页
export const goHome = () => {
  window.location.href = '/'
}