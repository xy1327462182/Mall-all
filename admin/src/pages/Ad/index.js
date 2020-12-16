import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AdList from './list'
import AdSave from './save'

class Ad extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path="/ad/save/:adId?" component={AdSave} />
        <Route exact path="/ad" component={AdList} />
      </Switch>
    )
  }
}

export default Ad