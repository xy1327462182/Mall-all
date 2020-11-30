import React from 'react'
import { Consumer } from './context'

function Link(props) {
  return (
    <Consumer>
      {
        //定义一个函数，来消费Provider提供的数据
        value => {
          //点击调用value.history.push方法
          return <a href={`#${props.to}`} onClick={()=>value.history.push(props.to)} >{props.children}</a>
        }
      }
    </Consumer>
  )
}

export default Link