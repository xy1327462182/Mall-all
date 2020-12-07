import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import CategoryList from './list'
import CategorySave from './save'

class Category extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path="/category/save/:categoryId?" component={CategorySave} />
        <Route exact path="/category" component={CategoryList} />
      </Switch>
    )
  }
}

export default Category