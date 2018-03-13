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

// model
const model = require('./model')
const Chat = model.getModel('chat') 

/** ----------------------------------------------------------- */
const userRouter = require('./user')
const app = express()
// socket io
const server = require('http').Server(app)
const io = require('socket.io')(server)
// Chat.remove({}, (err,doc) => {})
io.on('connection', socket => {
  console.log('user login')
  socket.on('sendmsg', data => {
    console.log('收到客户端消息', data)
    // io.emit('recvmsg', data)
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

// 使用中间件
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})