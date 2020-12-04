import * as actionTypes  from './actionTypes'
import axios from 'axios'

import { message } from 'antd';

import { saveUsername } from 'util'
import api from 'api'

const captchaAction = (data) => ({
    type: actionTypes.SET_CAPTCHA,
    payload: data
})

const loginStartAction = () => ({
  type: actionTypes.LOGIN_START
})

const loginEndAction = () => ({
  type: actionTypes.LOGIN_END
})

//获取验证码
export const getCaptchaAction = () => {
  return async function (dispatch) {
    const result = await api.getCaptcha()
    const { code, data } = result
    if (code == 0) {
      dispatch(captchaAction(data))
    }
  }
}

//请求登录
export const getLoginAction = (values) => {
  const { username, password, captcha } = values
  return async function (dispatch) {
    //请求登录开始，loading 状态改为true
    dispatch(loginStartAction())
    const result = await api.login({
      username,
      password,
      captchaCode: captcha,
      role: 'admin',
      channel: 'page'
    })
    if (result.code == 1) {
      //信息错误
      message.error(result.message,1)
    } else if (result.code == 0) {
      //登录成功
      message.success('恭喜您登录成功',1)
      //保存用户登录状态
      saveUsername(result.data.username)
      //跳转到首页
      window.location.href = '/'
    }
    dispatch(loginEndAction())
  }
}