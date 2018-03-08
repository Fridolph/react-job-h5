const express = require('express')
const mongoose = require('mongoose')
// 连接mongoDB 并且使用imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})// 类似于mysql的表，mongo里有文档、字段的概念

const User = mongoose.model('user', new mongoose.Schema({
  name: {type: String, require: true},
  age: {type: Number, require: true}
}))

User.create({
  name: 'xiaoming',
  age: 20
}, (err, doc) => {
  if (err) {
    throw Error(err)
  } else {
    console.log(doc)
  }  
})


/** ----------------------------------------------------------- */
// 新建app
User.remove({age: 20}, (err, doc) => {
  console.log(doc)
})
const app = express()

app.get('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
})

app.get('/data', (req, res) => {
  User.find({name: 'xiaoming'}, (err, doc) => {
    res.json(doc)
  }) 
})

app.listen(9093, () => {
  console.log('Node app start at port 9093')
})