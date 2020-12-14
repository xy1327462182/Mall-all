import React, { Component } from 'react'
import { Layout,Breadcrumb,Form,Input,InputNumber,Tag,Image,Card  } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import api from 'api'
import './detail.css'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.productId,
      attrs: [],
      mainImage: '',
      images: [],
      detail: ''
    }
    this.formRef = React.createRef()
  }

  //获取商品详情
  async handelProductDetail(id) {
    const result = await api.getProductDetail({ id })
    if (result.code == 0) {
      console.log('ressult.data::', result.data);
      const { category, name, description, price, stock, payNums, attrs, mainImage, images, detail } = result.data
      //设置表单各个字段的值
      this.formRef.current.setFieldsValue({
        category: category.name,
        name,
        description,
        price,
        stock,
        payNums,
      })
      this.setState({
        attrs,
        mainImage,
        images: images.split(','),
        detail
      })
    }
  }
  componentDidMount() {
    if (this.state.id) {
      //获取商品详情
      this.handelProductDetail(this.state.id)
    }
  }
  render() {
    const {
      attrs,
      mainImage,
      images,
      detail
    } = this.state

    const attrList = attrs.map(item => <Tag color="#3db389" key="_id" >{item.key}</Tag>)

    const imagesList = images.map(item => <Image
      key={item}
      width={100}
      src={item}
    />)

    return (
      <CustomLayout>
        <div className="ProductList">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>查看商品</Breadcrumb.Item>
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
              ref={this.formRef}
            >

              <Form.Item
                name="category"
                label="商品分类"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="name"
                label="商品名称"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="description"
                label="商品描述"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="price"
                label="商品价格"
              >
                <InputNumber disabled />
              </Form.Item>
              <Form.Item
                name="stock"
                label="商品库存"
              >
                <InputNumber disabled />
              </Form.Item>
              <Form.Item
                name="payNums"
                label="支付人数"
              >
                <InputNumber disabled />
              </Form.Item>
              <Form.Item
                label="商品属性"
              >
                {attrList}
              </Form.Item>
              <Form.Item
                label="封面图片"
              >
                <Image
                  width={100}
                  src={mainImage}
                />
              </Form.Item>
              <Form.Item
                label="商品图片"
              >
                <Image.PreviewGroup>
                  {imagesList}
                </Image.PreviewGroup>
              </Form.Item>
              <Form.Item
                label="商品详情"
              >
                <Card style={{ width: 500}}>
                  <div 
                    dangerouslySetInnerHTML={{__html: detail}}
                    style={{width: '100%'}}
                  ></div>
                </Card>
              </Form.Item>
            </Form>
          </Content>
        </div>
      </CustomLayout>
    )
  }
}

export default ProductDetail