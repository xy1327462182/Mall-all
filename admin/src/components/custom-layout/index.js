import React, { Component } from 'react'
import { Layout } from 'antd';

import './index.css'
import CustomHeader from 'components/custom-header'
import CustomSider from 'components/custom-sider'

class CustomLayout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="CustomLayout">
        <Layout>
          <CustomHeader />
          <Layout>
            <CustomSider />
            <Layout style={{ padding: '0 24px 24px' }}>
              {this.props.children}
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default CustomLayout