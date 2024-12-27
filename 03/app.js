const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express()
const port = 3000
// 接收请求类型是 application/x-www-form-urlencoded
// app.use(express.urlencoded())
// 接收请求类型是 application/json
app.use(express.json())
// // 跨域
app.use(cors())
// 日志  dev表示开发模式记录
app.use(morgan('dev'))
app.use('/api/v1', router)
// 添加打印日志中间件，并且需要写在路由之前
app.use((req, res, next) => {
    console.log('method:' + req.method, 'url:' + req.url, 'body:' + JSON.stringify(req.body))
    //必须调用next否则会阻塞
    next()
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})
