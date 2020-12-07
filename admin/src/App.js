import React,{ Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { getUsername } from 'util'

import Login from 'pages/Login'
import Home from 'pages/Home'
import User from 'pages/User'
import NotFound from 'pages/NotFound'

class App extends Component {
  render() {
    //登录了才能访问首页
    const ProtectRoute = ({component: Component, ...rest}) => (<Route {...rest} render={()=> getUsername() ? <Component/> : <Redirect to="/login" />} />)

    //未登录访问首页跳转到登录页
    const LoginRoute = ({component: Component, ...rest}) => (<Route {...rest} render={() => getUsername() ? <Redirect to="/" /> : <Component/>} />)

    return (
      <div className="App">
        <Router>
          <Switch>
            <ProtectRoute path="/" exact component={Home} />
            <LoginRoute path="/login" component={Login} />
            <ProtectRoute path="/user" exact component={User} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
