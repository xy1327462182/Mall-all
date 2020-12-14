import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Button, Input, InputNumber, Select, Transfer } from 'antd';
const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import RichEditor from 'components/custom-richEditor'
import { actionCreator } from './store'
import api from 'api'
import { PRODUCT_MAIN_IMAGE_UPLAOD, PRODUCT_DETAIL_IMAGES_UPLOAD } from 'api/config'

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

class ProductSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.productId,
    }
    this.finish = this.finish.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.getMainImageUrlList = this.getMainImageUrlList.bind(this)
    this.getDetailImageUrlList = this.getDetailImageUrlList.bind(this)
    this.getRichData = this.getRichData.bind(this)
    this.handelProductDetail = this.handelProductDetail.bind(this)
    this.formRef = React.createRef()
  }
  //设置主图表单字段的值
  getMainImageUrlList(imageUrlList) {
    this.formRef.current.setFieldsValue({
      mainImage: imageUrlList
    })
  }
  //设置详情图表单字段的值
  getDetailImageUrlList(imageUrlList) {
    this.formRef.current.setFieldsValue({
      images: imageUrlList
    })
  }
  //设置富文本数据字段的值
  getRichData(data) {
    this.formRef.current.setFieldsValue({
      detail: data
    })
    //更新store里的data
    this.props.handelRichData(data)
  }

  handleChange(nextTargetKeys, direction, moveKeys) {
    this.props.updateAttrTargetKeys(nextTargetKeys)
  };

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.props.updateAttrSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  };

  finish(values) {
    if (this.state.id) {
      values.id = this.state.id
    }
    //处理一下attrs
    if (values.attrs.length > 0) {
      values.attrs = values.attrs.join(',')
    }
    this.props.handelSave(values)
    //清除所有的fileList、richData、attrs
    this.props.clearFileList()
  }
  //获取商品详情
  async handelProductDetail(id) {
    const result = await api.getProductDetail({ id })
    if (result.code == 0) {
      //设置表单各个字段的值
      this.formRef.current.setFieldsValue({
        category: result.data.category._id,
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
      })
    }
  }
  /*
  code: 0
data:
attrs: [{…}]
category: {_id: "5fd6ed3335ae7a3a703cc980", name: "小米手机"}
description: "【品质好物】RedmiK305G版，120Hz流速屏【note9pro火热抢购中】"
detail: "<figure class="image"><img src="http://127.0.0.1:3000/product-images/1607921678491.jpg"></figure><figure class="image"><img src="http://127.0.0.1:3000/product-images/1607921681426.jpg"></figure><figure class="image"><img src="http://127.0.0.1:3000/product-images/1607921683523.jpg"></figure><figure class="image"><img src="http://127.0.0.1:3000/product-images/1607921686027.jpg"></figure>"
images: "http://127.0.0.1:3000/product-images/1607921641218.jpg,http://127.0.0.1:3000/product-images/1607921643723.jpg,http://127.0.0.1:3000/product-images/1607921645698.jpg,http://127.0.0.1:3000/product-images/1607921648344.jpg"
isHot: "1"
isShow: "1"
mainImage: "http://127.0.0.1:3000/product-images/1607921638627.jpg"
name: "Redmi K30 5G双模 120Hz流速屏 骁龙765G 前置挖孔双摄 索尼6400万后置四摄 30W快充"
order: 0
payNums: 578
price: 1799
status: "1"
stock: 25415
_id: "5fd6f01835ae7a3a703cc985"
  */

  componentDidMount() {
    //获取分类选择
    this.props.handelLevelCategories()
    //获取所有属性数据
    this.props.handelAllAttrs()
    if (this.state.id) {
      //获取商品详情
      this.handelProductDetail(this.state.id)
    }
  }
  render() {
    const {
      categories,
      attrDataSource,
      targetKeys,
      selectedKeys,
      mainImageFileList,
      handelMainImageFileList,
      detailImagesFileList,
      handelDetailImageFileList,
      richData,
      getRichData
    } = this.props

    let attrSelectedKeys, attrTargetKeys, ProMainImageFileList, ProDetailImagesFileList

    selectedKeys.toJS ? attrSelectedKeys = selectedKeys.toJS() : attrSelectedKeys = selectedKeys

    targetKeys.toJS ? attrTargetKeys = targetKeys.toJS() : attrTargetKeys = targetKeys

    mainImageFileList.toJS ? ProMainImageFileList = mainImageFileList.toJS() : ProMainImageFileList = mainImageFileList

    detailImagesFileList.toJS ? ProDetailImagesFileList = detailImagesFileList.toJS() : ProDetailImagesFileList = detailImagesFileList

    const {
      id,
    } = this.state;

    return (
      <CustomLayout>
        <div className="AttrList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '修改商品' : '添加商品'}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 542,
            }}
          >
            <Form {...layout}
              name="control-ref"
              onFinish={this.finish}
              ref={this.formRef}
              initialValues={{
                price: 0,
                stock: 0
              }}
            >

              <Form.Item
                name="category"
                label="商品分类"
                rules={[
                  {
                    required: true,
                    message: '请选择商品分类'
                  },
                ]}
              >
                <Select
                  placeholder="请选择商品分类"
                  allowClear
                >
                  {
                    categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
                label="商品名称"
                rules={[
                  {
                    required: true,
                    message: '请填写商品名称'
                  },
                ]}
              >
                <Input placeholder="请填写商品名称" />
              </Form.Item>
              <Form.Item
                name="description"
                label="商品描述"
                rules={[
                  {
                    required: true,
                    message: '请填写商品描述'
                  },
                ]}
              >
                <Input placeholder="请填写商品描述" />
              </Form.Item>
              <Form.Item
                name="price"
                label="商品价格"
                rules={[
                  {
                    required: true,
                    message: '请输入商品价格'
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                name="stock"
                label="商品库存"
                rules={[
                  {
                    required: true,
                    message: '请输入商品库存'
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                name="payNums"
                label="支付人数"
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                name="attrs"
                label="商品属性"
              >
                <Transfer
                  dataSource={attrDataSource}
                  titles={['未选属性', '已选属性']}
                  targetKeys={attrTargetKeys}
                  selectedKeys={attrSelectedKeys}
                  onChange={this.handleChange}
                  onSelectChange={this.handleSelectChange}
                  render={item => item.name}
                  rowKey={record => record._id}
                  style={{ marginBottom: 16 }}
                />
              </Form.Item>
              <Form.Item
                name="mainImage"
                label="封面图片"
                rules={[
                  {
                    required: true,
                    message: '请上传封面图片'
                  },
                ]}
              >
                <UploadImage
                  name="file"
                  action={PRODUCT_MAIN_IMAGE_UPLAOD}
                  max={1}
                  fileList={ProMainImageFileList}
                  getImageUrlList={this.getMainImageUrlList}
                  handelFileList={handelMainImageFileList}
                />
              </Form.Item>
              <Form.Item
                name="images"
                label="商品图片"
                rules={[
                  {
                    required: true,
                    message: '请上传商品图片'
                  },
                ]}
              >
                <UploadImage
                  name="file"
                  action={PRODUCT_MAIN_IMAGE_UPLAOD}
                  max={5}
                  fileList={ProDetailImagesFileList}
                  getImageUrlList={this.getDetailImageUrlList}
                  handelFileList={handelDetailImageFileList}
                />
              </Form.Item>
              <Form.Item
                name="detail"
                label="商品详情"
                rules={[
                  {
                    required: true,
                    message: '请上传商品详情'
                  },
                ]}
              >
                <RichEditor 
                  data={richData}
                  uploadUrl={PRODUCT_DETAIL_IMAGES_UPLOAD}
                  getRichData={this.getRichData}
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
    categories: state.get('product').get('categories'),
    attrDataSource: state.getIn(['product', 'attrDataSource']),
    targetKeys: state.getIn(['product', 'targetKeys']),
    selectedKeys: state.get('product').get('selectedKeys'),
    mainImageFileList: state.get('product').get('mainImageFileList'),
    detailImagesFileList: state.get('product').get('detailImagesFileList'),
    richData: state.get('product').get('richData'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handelSave: (values) => {
      dispatch(actionCreator.getSaveAction(values))
    },
    handelLevelCategories: () => {
      dispatch(actionCreator.getLevelCategoriesAction())
    },
    handelAllAttrs: () => {
      dispatch(actionCreator.getAllAttrsAction())
    },
    updateAttrSelectedKeys: (newAttrSelectedKeys) => {
      dispatch(actionCreator.getAttrSelectedKeysAction(newAttrSelectedKeys))
    },
    updateAttrTargetKeys: (newAttrTargetKeys) => {
      dispatch(actionCreator.getAttrTargetKeysAction(newAttrTargetKeys))
    },
    handelMainImageFileList: (fileList) => {
      dispatch(actionCreator.getMainImageFileListAction(fileList))
    },
    handelDetailImageFileList: (fileList) => {
      dispatch(actionCreator.getDetailImageFileListAction(fileList))
    },
    handelRichData: (data) => {
      dispatch(actionCreator.getRichDataAction(data))
    },
    clearFileList: () => {
      dispatch(actionCreator.getClearFileListAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSave)