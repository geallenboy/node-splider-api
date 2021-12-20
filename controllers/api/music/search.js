const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

// 音乐搜索
app.get('/:keyword', function (req, res) {
  const keyword = encodeURIComponent(req.params.keyword)
  const host = 'mobilecdn.kugou.com'
  const path = `/api/v3/search/song?format=json&keyword=${keyword}&page=1&pagesize=20&showtype=1`
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body).data,
        msg: ''
      })
    })
    .catch(function (err) {
      res.send({
        code: 404,
        msg: '网络好像有点问题'
      })
      console.log(err)
    })
})

module.exports = app
