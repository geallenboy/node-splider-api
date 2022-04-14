const { headers } = require('../../config/http')
const { requestGet } = require('../../utils/httpServer')

module.exports = {
  async nba_team_list() {
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team&a=hireracy&_=1639896955369`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      console.log(res, res.data)
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data),
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  },
  async nba_player_data(ctx, next) {
    const _year = ctx.params.year || '2021'
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&s=summary&a=player&pid=8ec91366-faea-4196-bbfd-b8fab7434795&season_type=reg&page=1&limit=20&season=2020`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      console.log(res, res.data)
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data),
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  },
  async nba_qdstats(ctx, next) {
    const _year = ctx.params.year || '2021'
    const url = `https://ziliaoku.sports.qq.com/cube/index?cubeId=10&dimId=53,54,55,56,57,58&from=sportsdatabase&limit=5&params=t2:${_year}|t3:1`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data),
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  },
  async nba_qystats(ctx, next) {
    const _year = ctx.params.year || '2021'
    const url = `https://ziliaoku.sports.qq.com/cube/index?cubeId=10&dimId=53,54,55,56,57,58&from=sportsdatabase&limit=5&params=t2:${_year}|t3:1`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data),
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  },
  async nba_rank(ctx, next) {
    const url = `https://matchweb.sports.qq.com/rank/team?columnId=100000&from=NBA_PC`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data)[1],
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  },
  async nba_vs(ctx, next) {
    const start = ctx.params.start || '2021-12-01'
    const end = ctx.params.end || '2021-12-10'
    const url = `http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=${start}&endTime=${end}&from=NBA_PC`
    await requestGet({
      url: url,
      headers: headers
    }).then((res) => {
      if (res.code === 200) {
        ctx.response.body = {
          code: 200,
          data: JSON.parse(res.data).data,
          msg: 'success'
        }
      } else {
        ctx.response.body = {
          code: 500,
          data: '',
          msg: res.data
        }
      }
    })
  }
}
