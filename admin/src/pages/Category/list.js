import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'

class CategoryList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <CustomLayout>
        <div className="CategoryList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
            <Link to="/category/save">新增</Link>
          </Content>
        </div>
      </CustomLayout>
      
    )
  }
}

export default CategoryList