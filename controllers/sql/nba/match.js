const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")

module.exports = {

  async nab_match_insert(ctx,next){
    let season_match = await requestGet({
      url:'http://localhost:3003/nba/season_matchs.json',
      // url:`https://slamdunk.sports.sina.com.cn/api?page=${pageArr[j]}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${res1[i].pid}&season_type=reg&season=2021`,
      headers: headers
    })

    console.log(JSON.parse(season_match.data).result.data,22)
  },
}