import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DesktopOutlined,
  BarsOutlined,
  ControlOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

import './index.css'

class CustomSider extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="CustomSider">
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: '620px', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <NavLink exact to="/"><DesktopOutlined />首页</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/user"><UserOutlined />用户管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/category"><BarsOutlined />分类管理</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/attr"><ControlOutlined />属性管理</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/product"><ShoppingOutlined />商品管理</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    )
  }
}

export default CustomSider