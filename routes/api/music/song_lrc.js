const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

// 获取音乐歌词
app.get('/:hash', function (req, res) {
  const hash = req.params.hash
  const host = 'm.kugou.com'
  const path = `/app/i/krc.php?cmd=100&hash=${hash}&timelength=3012000`
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: body,
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
