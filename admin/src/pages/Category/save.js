import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd'
const { Option } = Select;
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import { CATEGORY_ICON_UPLOAD } from 'api/config'
import * as actionCreator from './store/actionCreator'

class CategorySave extends Component {
  constructor(props) {
    super(props)
    this.getImageUrlList = this.getImageUrlList.bind(this)
    this.finish = this.finish.bind(this)
    this.formRef = React.createRef()
  }
  getImageUrlList(imageUrlList) {
    this.formRef.current.setFieldsValue({
      icon: imageUrlList
    })
  }
  finish(values) {
    this.props.handelSave(values)
  }
  componentDidMount() {
    this.props.handelLevelCategories()
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
    const { categories } = this.props
    return (
      <CustomLayout>
        <div className="CategoryList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加分类</Breadcrumb.Item>
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
                name="pid"
                label="父级分类名称"
                rules={[
                  {
                    required: true,
                    message: '请选择父级分类名称'
                  },
                ]}
              >
                <Select
                  placeholder="请选择父级分类名称"
                  onChange={() => { }}
                  allowClear
                >
                  <Option value="0">根分类</Option>
                  {
                    categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
                label="分类名称"
                rules={[
                  {
                    required: true,
                    message: '请填写分类名称'
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mobileName"
                label="手机分类名称"
                rules={[
                  {
                    required: true,
                    message: '请填写手机分类名称'
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="icon"
                label="手机分类图标"
                rules={[
                  {
                    required: true,
                    message: '请上传手机分类图标'
                  },
                ]}
              >
                <UploadImage 
                  action={CATEGORY_ICON_UPLOAD}
                  max={1}
                  getImageUrlList={this.getImageUrlList}
                />
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
    categories: state.get('category').get('categories')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handelSave: (values) => {
      dispatch(actionCreator.getSaveAction(values))
    },
    handelLevelCategories: () => {
      dispatch(actionCreator.getLevelCategoriesAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)