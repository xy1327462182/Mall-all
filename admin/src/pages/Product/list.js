import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Layout,
	Breadcrumb,
	Table,
	Button,
	Switch,
  InputNumber,
  Divider
} from 'antd'
const { Content } = Layout
import { Link } from 'react-router-dom'

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class ProductList extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.getProductList(1)
	}
	render() {
		const { 
      isFetching, 
      current, 
      list, 
      pageSize, 
      total,
      handelUpdateIsShow,
      handelUpdateStatus,
      handelUpdateIsHot,
      handelUpdateOrder
    } = this.props
		const dataSource = list

		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
        key: 'name',
        width: '35%',
				ellipsis: true,
			},
			{
				title: '是否显示在首页',
				dataIndex: 'isShow',
				key: 'isShow',
				width: '15%',
				render: (isShow, record) => (
					<Switch
						checkedChildren="显示"
						unCheckedChildren="隐藏"
						defaultChecked={isShow == '1' ? true : false}
						onChange={(checked) => {
							//更新状态
							const newIsShow = checked ? '1' : '0'
							handelUpdateIsShow(record._id, newIsShow)
						}}
					/>
				),
			},
			{
				title: '上架/下架',
				dataIndex: 'status',
				key: 'status',
				width: '10%',
				render: (status, record) => (
					<Switch
						checkedChildren="上架"
						unCheckedChildren="下架"
						defaultChecked={status == '1' ? true : false}
						onChange={(checked) => {
							//更新状态
							const newStatus = checked ? '1' : '0'
							handelUpdateStatus(record._id, newStatus)
						}}
					/>
				),
			},
			{
				title: '是否热门',
				dataIndex: 'isHot',
				key: 'isHot',
				width: '10%',
				render: (isHot, record) => (
					<Switch
						checkedChildren="是"
						unCheckedChildren="否"
						defaultChecked={isHot == '1' ? true : false}
						onChange={(checked) => {
							//更新状态
							const newIsHot = checked ? '1' : '0'
							handelUpdateIsHot(record._id, newIsHot)
						}}
					/>
				),
			},
			{
				title: '排序',
				dataIndex: 'order',
				key: 'order',
				width: '10%',
				render: (order, record) => (
					<InputNumber
						min={0}
						defaultValue={order}
						style={{ width: '80%' }}
						onBlur={(ev) => {
							if (ev.target.value != order) {
								handelUpdateOrder(record._id, ev.target.value)
							}
						}}
					/>
				),
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) => (
					<div>
						<Button type="primary" size="small">
							<Link to={`/product/save/${record._id}`}>修改</Link>
						</Button>
            <Divider type="vertical" />
						<Button type="primary" size="small">
							<Link to={`/product/save/${record._id}`}>查看</Link>
						</Button>
					</div>
				),
			},
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
						<Button
							type="primary"
							style={{ float: 'right', marginBottom: '8px' }}
						>
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
								onChange: (page) => getAttrList(page),
							}}
							loading={{
								spinning: isFetching,
								size: 'large',
								tip: '拼命加载中...',
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
		isFetching: state.get('product').get('isFetching'),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    //获取商品列表
		getProductList: (page) => {
			dispatch(actionCreator.getHandelPageAction(page))
    },
    //更新isShow
    handelUpdateIsShow: (id, newIsShow) => {
      dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
    //更新上下架状态
    handelUpdateStatus: (id, newStatus) => {
      dispatch(actionCreator.getUpdateStatusAction(id, newStatus))
    },
    //更新是否热门
    handelUpdateIsHot: (id, newIsHot) => {
      dispatch(actionCreator.getUpdateIsHotAction(id, newIsHot))
    },
    //更新排序
    handelUpdateOrder: (id, newOrder) => {
      dispatch(actionCreator.getUpdateProductOrderAction(id, newOrder))
    },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
