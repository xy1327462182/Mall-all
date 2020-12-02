import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import './index.css'

import * as actionCreators from './store/actionCreator'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    //获取验证码
    this.props.handelgetCaptcha()
  }
  render() {
    const { captcha, isFetching, handelgetCaptcha, handelFinish } = this.props
    return (
      <div className="Login">
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handelFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
              {
                pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                message: '用户名为4到16位（字母，数字，下划线）',
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
              {
                pattern: /^[\w]{4,12}$/,
                message: '密码为4到12位任意字符'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
              {
                pattern: /^[a-zA-Z0-9]{4}$/,
                message: '验证码为4位字母或数字',
              }
            ]}
          >
            <Row>
              <Col span={12}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="验证码" />
              </Col>
              <Col span={12}>
                <div 
                  className="captcha_svg" 
                  dangerouslySetInnerHTML={{__html:captcha}}
                  onClick={handelgetCaptcha}
                ></div>
              </Col>
            </Row>

          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              id="Login_btn" 
              className="login-form-button"
              loading={isFetching}
              >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    captcha: state.get('login').get('captcha'),
    isFetching: state.get('login').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handelgetCaptcha: () => {
      dispatch(actionCreators.getCaptchaAction())
    },
    handelFinish: (values) => {
      dispatch(actionCreators.getLoginAction(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)