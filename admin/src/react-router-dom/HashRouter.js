import React, { Component } from 'react'
import { Provider } from './context'

class HashRouter extends Component {
  constructor(props){
    super(props)
    //初始化数据 获取当前的location
    this.state = {
      //使用slice是为了去掉 #
      location: {
        //记录当前页面的pathname
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  componentDidMount() {
    //设置默认的hash
    window.location.hash = window.location.hash || '/'
    //监听hash值的变化
    window.onhashchange = () => {
      this.setState({
        location: {
          pathname: window.location.hash.slice(1)
        }
      })
    }
  }
  render() {
    const value = {
      location: this.state.location,
      history: {
        push(to){
          window.location.hash = to
        }
      }
    }
    //Provider提供数据  value就是传递出去的数据
    return (<Provider value={value}>{this.props.children}</Provider>)
  }
}

export default HashRouter