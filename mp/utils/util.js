module.exports = {
  promisify: function(api, options) {
    return new Promise((resolve, reject)=>{
      api(Object.assign({}, options, {success: resolve, fail: reject}))
    })
  }
}
