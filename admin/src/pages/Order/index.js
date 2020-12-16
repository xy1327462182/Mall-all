import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import OrderList from './list'
import OrderSave from './save'

class Order extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path="/order/save/:orderId?" component={OrderSave} />
        <Route exact path="/order" component={OrderList} />
      </Switch>
    )
  }
}

export default Order