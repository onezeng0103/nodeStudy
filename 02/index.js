const http = require('http')
const router = require('./router')
/**
 * 创建http服务
 */
const server = http.createServer((req, res) => {
    router(req, res)
})
/*
 * 监听3000端口
 */
server.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
