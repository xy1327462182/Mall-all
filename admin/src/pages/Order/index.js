import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import OrderList from './list'

class Order extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route exact path="/order" component={OrderList} />
      </Switch>
    )
  }
}

export default Order