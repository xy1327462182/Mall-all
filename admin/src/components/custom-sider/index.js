import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

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
            defaultSelectedKeys={['1']}
            style={{ height: '620px', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <NavLink to="/">首页</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/user">用户管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/category">分类管理</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    )
  }
}

export default CustomSider