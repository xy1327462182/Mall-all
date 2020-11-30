import React, { Component } from 'react'
import { Provider } from './context'

let pushState = window.history.pushState

window.history.pushState = (state,title,url)=>{
    pushState.call(window.history, state, title, url)
    //调用一个模拟的事件
    window.onstatechange && window.onstatechange()
}

class BrowserRouter extends Component {
  constructor(props){
    super(props)
    //初始化数据 获取当前的location
    this.state = {
      //使用slice是为了去掉 #
      location: {
        //记录当前页面的pathname
        pathname: window.location.pathname
      }
    }
  }
  componentDidMount() {
    //模拟监听
    window.onstatechange = () => {
      this.setState({
        location: {
          pathname: window.location.pathname
        }
      })
    }
  }
  render() {
    const value = {
      location: this.state.location,
      history: {
        push(to) {
          window.history.pushState(null,'',to)
        }
      }
    }
    //Provider提供数据  value就是传递出去的数据
    return (<Provider value={value}>{this.props.children}</Provider>)
  }
}

export default BrowserRouter