const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
// 连接mongoDB 并且使用imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})// 类似于mysql的表，mongo里有文档、字段的概念

/** ----------------------------------------------------------- */
const userRouter = require('./user')
const app = express()
// 使用中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(9093, () => {
  console.log('Node app start at port 9093')
})