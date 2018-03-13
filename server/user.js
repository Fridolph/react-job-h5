const express = require('express')
const Router = express.Router()
// 依赖
const md5Pwd = require('./util/pwd').md5Pwd
// mongodb
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = { pwd: 0, __v: 0 }

/*************************************************** */
// Chat.remove({}, (err, doc) => {})

Router.get('/list', (req, res) => {
  const { type } = req.query
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, data: doc })
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

Router.post('/update', (req, res) => {
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

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid

  User.find({}, (e, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {
        name: v.user,
        avatar: v.avatar
      }
    })
    Chat.find(
      {
        $or: [{ from: user }, { to: user }]
      },
      (err, doc) => {
        if (err) return res.json({ code: 1 })
        return res.json({ code: 0, msgs: doc, users })
      }
    )
  })
})

Router.post('/readmsg', (req, res) => {
  const { userid } = req.cookies
  const { from } = req.body
  // console.log('userid: ', userid, '\nfrom: ', from)
  Chat.update(
    { from, to: userid }, 
    { $set: { read: true } },
    { multi: true },
    (err, doc) => {
      // console.log('读取消息后的修改结果', doc)
      if (err) return res.json({code: 1, msg: '修改失败'})
      return res.json({code: 0, num: doc.nModified})
    }
  )
})

module.exports = Router
