

const app = require('express')()
const request = require('request')


/**
 * 球员数据
 * @param req
 * @param res
 */
 function nba_qystats (req, res) {
   const _year = req.params.year||'2021';
  const url = `https://ziliaoku.sports.qq.com/cube/index?cubeId=10&dimId=53,54,55,56,57,58&from=sportsdatabase&limit=5&params=t2:${_year}|t3:1`
  const headers = {
    'Connection': 'keep-alive',
    "content-type": "application/json",
    'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
  }
  request(
    {
      url: url,
      headers: headers
    },
    function (error, response, body) {
      if (response && response.statusCode === 200) {
       
        res.send({
          code: 200,
          data: JSON.parse(response.body).data,
          msg: 'success'
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有点问题'
        })
      }
    }
  )
}



app.get('/:year', function (req, res) {
  nba_qystats(req, res)
})

module.exports = app