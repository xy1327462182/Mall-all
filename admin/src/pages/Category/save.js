import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd'
const { Option } = Select;
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'

class CategorySave extends Component {
  constructor(props) {
    super(props)
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
            <Form {...layout} name="control-ref" onFinish={()=>{}}>
              <Form.Item
                name="note"
                label="Note"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={() => { }}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
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

export default CategorySave