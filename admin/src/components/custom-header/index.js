import React, { Component } from 'react'

import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Header } = Layout;

import './index.css'
import { getUsername, delUsername, goLogin } from 'util'
import api from 'api'

class CustomHeader extends Component {
  constructor(props) {
    super(props)
    this.handelLogout = this.handelLogout.bind(this)
  }
  async handelLogout() {
    //发送请求登出
    await api.logout()
    //删除本地存储
    delUsername()
    //跳转到登录页
    goLogin()
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.handelLogout}>退出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="CustomHeader">
          <Header className="header">
            <div className="logo">SortMall</div>
            <div className="logout">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {getUsername()} <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Header>
      </div>
    )
  }
}

export default CustomHeader