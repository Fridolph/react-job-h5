const express = require('express')
const Router = express.Router()
// 依赖
const md5Pwd = require('./util/pwd').md5Pwd
// mongodb
const model = require('./model')
const User = model.getModel('user')
const _filter = { pwd: 0, __v: 0 }

/*************************************************** */

Router.get('/list', (req, res) => {  
  const { type } = req.query
  User.find({type}, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})

// 登录接口
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne(
    { user, pwd: md5Pwd(pwd) }, // 查询条件
    _filter,
    (err, doc) => {
      if (!doc) return res.json({ code: 1, msg: '用户名或密码错误' })
      // 保存cookie 很重要，不然更新时没有这个cookie进行不了操作
      res.cookie('userid', doc._id)
      return res.json({ code: 0, data: doc })
    }
  )
})

// 注册接口
Router.post('/register', (req, res) => {
  // console.log(req.body)
  const { user, pwd, type } = req.body
  User.findOne({ user }, _filter, (err, doc) => {
    // 拿到返回接口，判断是否注册过
    if (doc) {
      // doc表示有入库记录
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, pwd: md5Pwd(pwd), type }, (err, doc) => {
      if (err) res.json({ code: 1, msg: '服务器错误，请稍后重试' })
      // 保存cookie 很重要，不然更新时没有这个cookie进行不了操作
      res.cookie('userid', doc._id)
      return res.json({ code: 0 })
    })
  })
})

Router.get('/info', (req, res) => {
  return res.json({
    code: 1
  })
})

Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  // console.log('cookies', req.cookies)
  if (!userid) return json.dumps({ code: 1 })

  const body = req.body
  // console.log('req.body => ', body)
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, { user: doc.user, type: doc.type }, body)
    return res.json({ code: 0, data })
  })
})

module.exports = Router
