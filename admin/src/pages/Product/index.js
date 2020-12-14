import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProductList from './list'
import ProductSave from './save'
import ProductDetail from './detail'

class Product extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path="/product/detail/:productId" component={ProductDetail} />
        <Route path="/product/save/:productId?" component={ProductSave} />
        <Route exact path="/product" component={ProductList} />
      </Switch>
    )
  }
}

export default Product