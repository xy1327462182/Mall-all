import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Table,Button,Input,Switch,InputNumber } from 'antd';
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
    const { 
      isFetching,
      current,
      list,
      pageSize,
      total,
      getCategoryList,
      handelUpdateName,
      handelUpdateMobileName,
      handelUpdateIsShow,
      handelUpdateIsFloor,
      handelUpdateOrder
    } = this.props
    const dataSource = list
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (name, record) => <Input
          style={{width: '70%'}}
          defaultValue={name}
          onBlur={(ev)=>{
            if (ev.target.value != name) {
              handelUpdateName(record._id, ev.target.value)
            }
          }}
        ></Input>
      },
      {
        title: '手机分类名称',
        dataIndex: 'mobileName',
        key: 'mobileName',
        width: '20%',
        render: (mobileName, record) => <Input
          style={{width: '70%'}}
          defaultValue={mobileName}
          onBlur={(ev)=>{
            if (ev.target.value != mobileName) {
              handelUpdateMobileName(record._id, ev.target.value)
            }
          }}
        ></Input>
      },
      {
        title: '手机图标',
        dataIndex: 'icon',
        key: 'icon',
        width: '15%',
        render: icon => <img 
          src={icon} 
          style={{width: '50px', height: '50px'}}
        />
      },
      {
        title: '是否显示',
        dataIndex: 'isShow',
        key: 'isShow',
        width: '10%',
        render: (isShow,record) => <Switch 
        checkedChildren="显示" 
        unCheckedChildren="隐藏" 
        defaultChecked={isShow == '1' ? true: false}
        onChange={ checked => {
          //更新状态
          const newIsShow = checked ? '1' : '0'
          handelUpdateIsShow(record._id, newIsShow)
        }}
        />
      },
      {
        title: '是否楼层',
        dataIndex: 'isFloor',
        key: 'isFloor',
        width: '10%',
        render: (isFloor, record) => record.level == 1 ?
        <Switch 
        checkedChildren="是" 
        unCheckedChildren="否" 
        defaultChecked={isFloor == '1' ? true: false}
        onChange={ checked => {
          //更新状态
          const newIsFloor = checked ? '1' : '0'
          handelUpdateIsFloor(record._id, newIsFloor)
        }}
        /> : null
      },
      {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        width: '10%',
        render: (order, record) => <InputNumber 
          min={0}
          defaultValue={order}
          style={{width: '90%'}}
          onBlur={ ev => {
            if (ev.target.value != order) {
              handelUpdateOrder(record._id, ev.target.value)
            }
          }}
        />
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => <span>
          <Link to={`/category/save/${record._id}`}>修改</Link>
        </span>
      }
    ]
    
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
            <Button type="primary" style={{float: 'right', marginBottom: '8px'}}>
              <Link to="/category/save">新增</Link>
            </Button>
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
    handelUpdateName: (id, newName) => {
      dispatch(actionCreator.getUpdateNameAction(id, newName))
    },
    handelUpdateMobileName: (id, newMobileName) => {
      dispatch(actionCreator.getUpdateMobileNameAction(id, newMobileName))
    },
    handelUpdateIsShow: (id, newIsShow) => {
      dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
    handelUpdateIsFloor: (id, newIsFloor) => {
      dispatch(actionCreator.getUpdateIsFloorAction(id, newIsFloor))
    },
    handelUpdateOrder: (id, newOrder) => {
      dispatch(actionCreator.getUpdateCategoryOrderAction(id, newOrder))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)