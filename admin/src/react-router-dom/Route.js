import React from 'react'
import { pathToRegexp } from 'path-to-regexp'
import { Consumer } from './context'

function Route(props) {
  return (
    <Consumer>
      {
        //定义一个函数，来消费Provider提供的数据
        value => {
          //拿到Provider提供的pathname
          const { pathname } = value.location

          //拿到组件传递过来的数据
          //exact默认为false
          //component重新命名为首字母大写
          const { path, component: Component, exact = false } = props

          //根据path生成正则
          const paramNames = []
          //end是ture表示在正则结尾添加$,是false就不添加
          const reg = pathToRegexp(path, paramNames, { end: exact })

          //匹配结果
          const result = pathname.match(reg)
          if (result) {
            //处理参数
            const names = paramNames.map(item => item.name)
            const [url, ...values] = result
            const params = {}
            names.forEach((name, index) => {
              params[name] = values[index]
            })
            const props = {
              location: value.location,
              history: value.history,
              match: {
                params,
                path,
                url,
                isExact: exact
              }
            }
            //将传递来的组件返回出去，进行渲染
            return <Component {...props} />
          }
          return null
        }
      }
    </Consumer>
  )
}

export default Route
