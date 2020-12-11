import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
const { Content } = Layout;
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class CategoryList extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.getCategoryList(1)
  }
  render() {
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '手机分类名称',
        dataIndex: 'mobileName',
        key: 'mobileName'
      },
      {
        title: '手机图标',
        dataIndex: 'icon',
        key: 'icon'
      },
      {
        title: '是否显示',
        dataIndex: 'isShow',
        key: 'isShow'
      },
      {
        title: '是否是楼层',
        dataIndex: 'isFloor',
        key: 'isFloor'
      },
      {
        title: '排序',
        dataIndex: 'order',
        key: 'order'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => <span>
          <Link to='/category/save'>修改</Link>
        </span>
      }
    ]
    const { isFetching,current,list,pageSize,total,getCategoryList } = this.props
    const dataSource = list
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
            <Table 
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: false,
              onChange: page => getCategoryList(page)
            }}
            loading={{
              spinning: isFetching,
              size: 'large',
              tip: '拼命加载中...'
            }}
            />
          </Content>
        </div>
      </CustomLayout>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.get('category').get('current'),
    list: state.get('category').get('list'),
    pageSize: state.get('category').get('pageSize'),
    total: state.get('category').get('total'),
    isFetching: state.get('category').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (page) => {
      dispatch(actionCreator.getCategoryListAction(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)