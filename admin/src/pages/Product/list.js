import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Table,Button,Input,Switch,InputNumber } from 'antd';
const { Content } = Layout;
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class ProductList extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    // this.props.getAttrList(1)
  }
  render() {
    const { 
      isFetching,
      current,
      list,
      pageSize,
      total
    } = this.props
    const dataSource = list

    const columns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '属性键',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '属性值',
        dataIndex: 'value',
        key: 'value',
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
          <Link to={`/attr/save/${record._id}`}>修改</Link>
        </span>
      }
    ]
    
    return (
      <CustomLayout>
        <div className="AttrList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
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
              <Link to="/product/save">新增商品</Link>
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
              onChange: page => getAttrList(page)
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
    current: state.get('product').get('current'),
    list: state.get('product').get('list'),
    pageSize: state.get('product').get('pageSize'),
    total: state.get('product').get('total'),
    isFetching: state.get('product').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)