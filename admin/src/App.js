import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from './react-router-dom'

function Home() {
  return (
    <div className="Home">
      Home
    </div>
  )
}

function About() {
  return (
    <div className="About">
      About
    </div>
  )
}

function User(props) {
  return (
    <div className="User">
      User
    </div>
  )
}

function UserProfile() {
  return (
    <div className="UserProfile">
      UserProfile
    </div>
  )
}

function NotFound() {
  return (
    <div className="NotFound">
      NotFound
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Link to="/home">首页</Link>
          <br/>
          <Link to="/about">关于</Link>
          <br/>
          <Link to="/user/123">用户中心</Link>
          <br/>
          <Link to="/user/profile">用户配置</Link>

          {/* 给Route组件传递path属性和component */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/user/profile" exact={true} component={UserProfile} />
            <Route path="/user/:id" component={User} />
            <Route path="/notfound" component={NotFound} />
            <Redirect to="/notfound"/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
