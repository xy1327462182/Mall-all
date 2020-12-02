import * as actionTypes  from './actionTypes'
import axios from 'axios'

import { message } from 'antd';

import { saveUsername } from '../../../utils'

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
    const result = await axios({
      method: 'get',
      url: '/v1/users/captcha',
    });
    const { code, data } = result.data
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
    const result = await axios({
      method: 'post',
      url: '/v1/users/login',
      data: {
        username,
        password,
        captchaCode: captcha,
        role: 'admin',
        channel: 'page'
      }
    });
    const data = result.data
    if (data.code == 1) {
      //信息错误
      message.error(data.message,1)
    } else if (data.code == 0) {
      //登录成功
      message.success('恭喜您登录成功',1)
      //保存用户登录状态
      saveUsername(data.data.username)
    }
    dispatch(loginEndAction())
  }
}