import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Table,Button,Input } from 'antd';
const { Content } = Layout;
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class OrderList extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    
  }
  render() {
    const columns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        key: 'name',
      }
    ]
    
    return (
      <CustomLayout>
        <div className="OrderList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>订单管理</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
            order list
          </Content>
        </div>
      </CustomLayout>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)