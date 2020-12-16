import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Table,Button,Image,InputNumber,Switch } from 'antd';
const { Content } = Layout;
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class AdList extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    //获取广告数据
    this.props.getAdList(1)
  }
  render() {
    const { 
      isFetching,
      current,
      list,
      pageSize,
      total,
      getAdList,
      handelUpdateOrder,
      handelUpdateIsShow
    } = this.props
    const dataSource = list

    const columns = [
      {
        title: '广告名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '广告位置',
        dataIndex: 'position',
        key: 'position',
        width: '20%',
        render: position => position=='1'?'电脑端首页轮播图' : '移动端端首页轮播图'   
      },
      {
        title: '广告缩略图',
        dataIndex: 'image',
        key: 'image',
        width: '15%',
        render: image=><Image
        width={80}
        src={image}
      />
      },
      {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        width: '15%',
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
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => <span>
          <Link to={`/ad/save/${record._id}`}>修改</Link>
        </span>
      }
    ]
    
    return (
      <CustomLayout>
        <div className="AdList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>广告管理</Breadcrumb.Item>
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
              <Link to="/ad/save">新增广告</Link>
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
              onChange: page => getAdList(page)
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
    current: state.get('ad').get('current'),
    list: state.get('ad').get('list'),
    pageSize: state.get('ad').get('pageSize'),
    total: state.get('ad').get('total'),
    isFetching: state.get('ad').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAdList: (page) => {
      dispatch(actionCreator.getAdListAction(page))
    },
    handelUpdateOrder: (id, newOrder) => {
      dispatch(actionCreator.getUpdateAdOrderAction(id, newOrder))
    },
    handelUpdateIsShow: (id, newIsShow) => {
      dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdList)