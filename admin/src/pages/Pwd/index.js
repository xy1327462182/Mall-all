import React, { Component } from 'react'
import { Layout,Breadcrumb,Form,Button,Input, message } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { delUsername, goLogin } from 'util'
import api from 'api'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

class Pwd extends Component {
  constructor(props){
    super(props)
    this.finish = this.finish.bind(this)
  }
  async finish(values) {
    const { password, repassword } = values
    if (password != repassword) {
      message.error('两次输入密码不一致', 1)
      return 
    }
    const result = await api.pwd({ password })
    if (result.code == 0) {
      //修改成功
      message.success(result.message, 1)
      //退出登录
      
      await api.logout()
      //删除本地存储
      delUsername()
      //跳转到登录页
      goLogin()
    } else {
      message.error(result.message, 1)
    }
  }
  render() {
    return (
      <CustomLayout>
        <div className="Pwd">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>修改密码</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
            <Form {...layout} name="control-ref" onFinish={this.finish} >
              <Form.Item
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码'
                  },
                  {
                    pattern: /^\w{3,6}$/,
                    message: '密码是3-6位任意字符!',
                  }
                ]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <Form.Item
                name="repassword"
                label="再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码'
                  },
                ]}
              >
                <Input.Password placeholder="请再次输入密码" />
              </Form.Item>
              
              
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </div>
      </CustomLayout>
    )
  }
}


export default Pwd