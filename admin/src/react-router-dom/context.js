import React from 'react'
const myContext = React.createContext()

const { Provider, Consumer } = myContext

export {
  Provider,//提供数据
  Consumer//消费数据
}