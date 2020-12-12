import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AttrList from './list'
import AttrSave from './save'

class Attr extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path="/attr/save/:attrId?" component={AttrSave} />
        <Route exact path="/attr" component={AttrList} />
      </Switch>
    )
  }
}

export default Attr