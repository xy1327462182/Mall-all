import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Row, Col, Card } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCounts()
  }
  render() {
    const { usernum, productnum, ordernum } = this.props
    return (
      <CustomLayout>
        <div className="Home">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <Card title="用户数">
                  <p>{usernum}</p>
                </Card>
              </Col>
              <Col className="gutter-row" span={8}>
                <Card title="商品数">
                  <p>{productnum}</p>
                </Card>
              </Col>
              <Col className="gutter-row" span={8}>
                <Card title="订单数">
                  <p>{ordernum}</p>
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      </CustomLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usernum: state.getIn(['home', 'usernum']),
    productnum: state.getIn(['home', 'productnum']),
    ordernum: state.getIn(['home', 'ordernum'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCounts: () => {
      dispatch(actionCreator.getCountsAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)