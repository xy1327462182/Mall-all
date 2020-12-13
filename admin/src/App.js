import React,{ Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { getUsername } from 'util'

import Login from 'pages/Login'
import Home from 'pages/Home'
import User from 'pages/User'
import Category from 'pages/Category'
import Attr from 'pages/Attr'
import Product from 'pages/Product'
import NotFound from 'pages/NotFound'

//登录了才能访问首页
const ProtectRoute = ({component: Component, ...rest}) => (<Route {...rest} render={()=> getUsername() ? <Component/> : <Redirect to="/login" />} />)

//未登录访问首页跳转到登录页
const LoginRoute = ({component: Component, ...rest}) => (<Route {...rest} render={() => getUsername() ? <Redirect to="/" /> : <Component/>} />)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <ProtectRoute exact path="/" component={Home} />
            <ProtectRoute path="/user" component={User} />
            <ProtectRoute path="/category" component={Category} />
            <ProtectRoute path="/attr" component={Attr} />
            <ProtectRoute path="/product" component={Product} />
            <LoginRoute path="/login" component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
