import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Form,Button,Input } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import api from 'api'

class AttrSave extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.attrId,
    }
    this.finish = this.finish.bind(this)
    this.handelAttrDetail = this.handelAttrDetail.bind(this)
    this.formRef = React.createRef()
  }
  finish(values) {
    if (this.state.id) {
      values.id = this.state.id
    }
    this.props.handelSave(values)
  }
  async handelAttrDetail(id) {
    const result = await api.getAttrDetail({ id })
    if (result.code == 0) {
      //设置表单各个字段的值
      this.formRef.current.setFieldsValue({
        name: result.data.name,
        key: result.data.key,
        value: result.data.value,
      })
    }
  }
  componentDidMount() {
    if (this.state.id) {
      //获取属性详情
      this.handelAttrDetail(this.state.id)
    }
  }
  render() {
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 16,
      },
    };
    const { id } = this.state
    return (
      <CustomLayout>
        <div className="AttrList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>属性管理</Breadcrumb.Item>
            <Breadcrumb.Item>{ id ? '修改属性': '添加属性'}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
            <Form {...layout} name="control-ref" onFinish={this.finish} ref={this.formRef}>
              <Form.Item
                name="name"
                label="属性名称"
                rules={[
                  {
                    required: true,
                    message: '请填写属性名称'
                  },
                ]}
              >
                <Input placeholder="属性名称" />
              </Form.Item>
              <Form.Item
                name="key"
                label="属性键"
                rules={[
                  {
                    required: true,
                    message: '请填写属性键'
                  },
                ]}
              >
                <Input placeholder="属性键" />
              </Form.Item>
              <Form.Item
                name="value"
                label="属性值"
                rules={[
                  {
                    required: true,
                    message: '请填写属性值'
                  },
                ]}
              >
                <Input placeholder="属性值，用英文逗号分隔" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
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
    handelSave: (values) => {
      dispatch(actionCreator.getSaveAction(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttrSave)