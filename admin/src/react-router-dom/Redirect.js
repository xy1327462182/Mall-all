import React from 'react'
import { Consumer } from './context'

function Redirect(props) {
  return (
    <Consumer>
      {
        //定义一个函数，来消费Provider提供的数据
        value => {
          value.history.push(props.to)
          return null
        }
      }
    </Consumer>
  )
}

export default Redirect