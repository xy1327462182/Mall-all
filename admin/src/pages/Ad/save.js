import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Breadcrumb,Form,Button,Input,Select, message } from 'antd';
const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import { AD_IMAGE_UPLOAD } from 'api/config'
import api from 'api'
import { actionCreator } from './store'

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

class AdSave extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.adId,
    }
    this.formRef = React.createRef()
    this.finish = this.finish.bind(this)
    this.getImageUrlList = this.getImageUrlList.bind(this)
    this.handelAdDetail = this.handelAdDetail.bind(this)
  }
  getImageUrlList(imageUrlList) {
    console.log(imageUrlList);
    this.formRef.current.setFieldsValue({
      image: imageUrlList
    })
  }
  finish(values) {
    if (this.state.id) {
      values.id = this.state.id
    }
    //提交表单
    this.props.handelSave(values)
    //清除表单残留数据
    this.formRef.current.setFieldsValue({
      image: '',
      name: '',
      position: '',
      link:''
    })
    this.props.handelFileList([])
  }
  componentDidMount() {
    if (this.state.id) {
      //获取广告详情
      this.handelAdDetail(this.state.id)
    }
  }
  async handelAdDetail(id){
    try{
      const result = await api.getAdDetail({
        id
      })
      if (result.code == 0) {
        //设置表单各个字段的值
        this.formRef.current.setFieldsValue({
          image: result.data.image,
          name: result.data.name,
          position: result.data.position,
          link: result.data.link,
        })
        this.props.handelFileList([{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: result.data.image
        }])
      }
    }catch(e){
      message.error('网络请求失败')
    }
  }
  componentWillUnmount() {
    //清除表单残留数据
    this.formRef.current.setFieldsValue({
      image: '',
      name: '',
      position: '',
      link:''
    })
    this.props.handelFileList([])
  }
  render() {
    const {
      fileListObj,
      handelFileList
    } = this.props

    const fileList = fileListObj.fileList
    
    return (
      <CustomLayout>
        <div className="AdSave">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>广告管理</Breadcrumb.Item>
            <Breadcrumb.Item>广告</Breadcrumb.Item>
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
                label="广告名称"
                rules={[
                  {
                    required: true,
                    message: '请填写广告名称'
                  },
                ]}
              >
                <Input placeholder="广告名称" />
              </Form.Item>
              <Form.Item
                name="link"
                label="广告地址"
                rules={[
                  {
                    required: true,
                    message: '请填写广告地址'
                  },
                ]}
              >
                <Input placeholder="广告地址" />
              </Form.Item>
              <Form.Item
                name="position"
                label="广告位置"
                rules={[
                  {
                    required: true,
                    message: '请选择广告位置'
                  },
                ]}
              >
                <Select
                  placeholder="请选择广告位置"
                  allowClear
                >
                  <Option value="1">电脑端首页轮播图</Option>
                  <Option value="2">移动端首页轮播图</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                label="广告图片"
                rules={[
                  {
                    required: true,
                    message: '请上传广告图片'
                  },
                ]}
              >
                <UploadImage 
                  name="file"
                  action={AD_IMAGE_UPLOAD}
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
    fileListObj: state.get('ad').get('fileListObj').toJS()
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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdSave)