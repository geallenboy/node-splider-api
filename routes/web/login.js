'use strict'
const app = require('express')()
const ejs = require('ejs').__express
// 这里也可以配置识别HTML
app.engine('ejs', ejs) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径

app.get('/', function (req, res) {
  res.render('login', {
    title: 'Nodejs_express'
  })
})
module.exports = app
