const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devServer: {
        host: '192.168.1.106',
        port: 3003,
        proxy: {           
            '/v1':{
                target: 'http://192.168.1.106:3000',
                ws: false,
                changeOrigin: true               
            }
        }
    }, 
})