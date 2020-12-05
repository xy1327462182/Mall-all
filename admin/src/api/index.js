import axios from 'axios'

//引入配置文件数据
import { API_CONFIG, SERVER, VERSION } from './config'
import { delUsername, goLogin } from 'util'

const getApiObj = (apiConfig) => {
  let apiObj = {}
  //根据配置文件的数据，遍历生成每一个api的可调用的方法
  for (let key in apiConfig) {
    apiObj[key] = (data) => {
      const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
      const method = apiConfig[key][1] || 'get'
      //请求的结果是promise对象 return出去
      return request(url, method, data)
    }
  }
  return apiObj
}

const request = (url, method, data) => {
  return new Promise((resolve, reject)=>{
    axios({ method, url, data })
    .then(result=>{
      const data = result.data
      if (data.code == 10) {
        //没有权限 删除本地存储
        delUsername()
        //跳转到登录页
        goLogin()
        reject('没有权限')
      } else {
        resolve(data)
      }
    })
    .catch(err=>{
      reject(err)
    })
  })
}

export default getApiObj(API_CONFIG)