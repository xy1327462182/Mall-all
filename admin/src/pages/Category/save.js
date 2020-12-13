import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd'
const { Option } = Select;
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import { CATEGORY_ICON_UPLOAD } from 'api/config'
import api from 'api'
import * as actionCreator from './store/actionCreator'

class CategorySave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.categoryId,
    }
    this.getImageUrlList = this.getImageUrlList.bind(this)
    this.finish = this.finish.bind(this)
    this.handelCategoryDetail = this.handelCategoryDetail.bind(this)
    this.formRef = React.createRef()
  }
  getImageUrlList(imageUrlList) {
    this.formRef.current.setFieldsValue({
      icon: imageUrlList
    })
  }
  finish(values) {
    if (this.state.id) {
      values.id = this.state.id
    }
    this.props.handelSave(values)
  }
  componentDidMount() {
    if (this.state.id) {
      //获取分类详情
      this.handelCategoryDetail(this.state.id)
    } else {
      this.props.handelFileList([])
    }
    //获取分类选择
    this.props.handelLevelCategories()
  }
  async handelCategoryDetail(id) {
    const result = await api.getCategoryDetail({ id })
    if (result.code == 0) {
      //设置表单各个字段的值
      this.formRef.current.setFieldsValue({
        pid: result.data.pid,
        name: result.data.name,
        mobileName: result.data.mobileName,
        icon: result.data.icon,
      })
      this.props.handelFileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: result.data.icon
      }])
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
    const { categories,fileListObj, handelFileList } = this.props
    const fileList = fileListObj.fileList
    
    const { id } = this.state
    return (
      <CustomLayout>
        <div className="CategoryList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            <Breadcrumb.Item>{ id ? '修改分类': '添加分类'}</Breadcrumb.Item>
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
                  name="file"
                  action={CATEGORY_ICON_UPLOAD}
                  max={1}
                  fileList={fileList}
                  handelFileList={handelFileList}
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
    categories: state.get('category').get('categories'),
    fileListObj: state.get('category').get('fileListObj').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handelFileList: (fileList) => {
      dispatch(actionCreator.getFileListAction(fileList))
    },
    handelSave: (values) => {
      dispatch(actionCreator.getSaveAction(values))
    },
    handelLevelCategories: () => {
      dispatch(actionCreator.getLevelCategoriesAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)