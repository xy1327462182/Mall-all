import React from 'react'
import { pathToRegexp } from 'path-to-regexp'
import { Consumer } from './context'

function Switch(props) {
  return (
    <Consumer>
      {
        //定义一个函数，来消费Provider提供的数据
        value => {
          const children = props.children
          //获取当前的pathname
          const pathname = value.location.pathname

          for (let i = 0, len = children.length; i < len; i++) {
            let child = children[i]
            //获取child的属性
            const { path="", exact=false } = child.props

            //生成正则
            const paramNames = []
            const reg = pathToRegexp(path, paramNames, { end: exact })

            //匹配结果
            const result = pathname.match(reg)
            if (result) {
              //如果匹配到，将当前child return出去
              return child
            }
          }
          //如果都每匹配到，返回null
          return null
        }
      }
    </Consumer>
  )
}

export default Switch