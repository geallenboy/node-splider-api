const apiRouter = require('koa-router')()
const nba = require('../controllers/api/nba')

apiRouter.get('/api/nba/vs/:start/:end',nba.nba_vs);//赛程
apiRouter.get('/api/nba/rank',nba.nba_rank); //排行
apiRouter.get('/api/nba/qystats/:year',nba.nba_qystats); //球员信息
apiRouter.get('/api/nba/nba_qdstats/:year',nba.nba_qdstats); //球队信息
apiRouter.get('/api/nba/nba_player_data',nba.nba_player_data); //球员数据

module.exports = apiRouter