

const app = require('express')()
const request = require('request')


/**
 * 获取NBA排名
 * @param req
 * @param res
 */
 function nba_rank (req, res) {
  const url = `https://matchweb.sports.qq.com/rank/team?columnId=100000&from=NBA_PC`
  const headers = {
    // 'Cookie': 'pgv_pvid=1116982820; pac_uid=0_6b5109fd02af7; RK=qOzhWI9mYm; ptcz=3d7b16c05578bb46c0d68ddfa7473988195766eb213cf18a6930a51991a49316; iip=0; pgv_pvi=3215693824; tvfe_boss_uuid=47ccdfeac31daec5; _ga=GA1.2.472310095.1600830387; AMCV_248F210755B762187F000101%40AdobeOrg=-1712354808%7CMCIDTS%7C18800%7CMCMID%7C58305023413344494314354549952960394650%7CMCAAMLH-1624844085%7C11%7CMCAAMB-1624844085%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1624246485s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.3.0; Qs_lvt_323937=1626139793; Qs_pv_323937=2102824476145256700; eas_sid=S156p2T601C3H9U9Y045Y7s0u7',
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
        console.log(JSON.parse(response.body).length)
        res.send({
          code: 200,
          data: JSON.parse(response.body)[1],
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



app.get('/', function (req, res) {
  nba_rank(req, res)
})

module.exports = app