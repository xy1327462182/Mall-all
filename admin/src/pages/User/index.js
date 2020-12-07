import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import { formatDate } from 'util'

class User extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getUserList(1)
  }
  render() {
    const { isFetching,current,list,pageSize,total,getUserList,handelUpdateUserActive } = this.props
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '是否管理员',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: isAdmin => isAdmin ? '是' : '否'
      },
      {
        title: '是否有效用户',
        dataIndex: 'isActive',
        key: 'isActive',
        render: isActive => <Switch 
        checkedChildren="是" 
        unCheckedChildren="否" 
        defaultChecked={isActive == '1' ? true: false}
        onChange={(checked, recored) => {
          //更新状态
          const newActive = checked ? '1' : '0'
          handelUpdateUserActive(recored._id, newActive)
        }}
        />
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '微信openid',
        dataIndex: 'wxopenid',
        key: 'wxopenid'
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: createdAt => formatDate(createdAt)
      },
    ]
    
    const dataSource = list
    return (
      <CustomLayout>
        <div className="User">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
           <Table 
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: false,
              onChange: page => getUserList(page)
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
    current: state.get('user').get('current'),
    list: state.get('user').get('list'),
    pageSize: state.get('user').get('pageSize'),
    total: state.get('user').get('total'),
    isFetching: state.get('user').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (page) => {
      dispatch(actionCreator.getUserListAction(page))
    },
    handelUpdateUserActive: (id, newActive) => {
      dispatch(actionCreator.getUpdateUserActiveAction(id, newActive))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)