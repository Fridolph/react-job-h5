const mongoose = require('mongoose')
// 连接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'

mongoose.connect(DB_URL)

const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require:true},
    type: {type: String, require: true},    
    avatar: {type: String},// 头像
    desc: {type: String},// 个人简介 或 职位简介
    title: {type: String},// 职位
    // 如果是boss还有两个字段
    company: {type: String},
    money: {type: String}
  },
  chat: {}
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}