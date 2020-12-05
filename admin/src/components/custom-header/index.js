import React, { Component } from 'react'

import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Header } = Layout;

import './index.css'
import { getUsername } from 'util'

class CustomHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={() => console.log(111)} >退出</a>
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