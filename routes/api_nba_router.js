const apiNbaRouter = require('koa-router')()
const nba = require('../controllers/api/nba')
const nba_match = require('../controllers/api/nba/match')
const nba_team = require('../controllers/api/nba/team')
const nba_rank = require('../controllers/api/nba/rank')

apiNbaRouter.get('/api/nba/match/list', nba_match.nba_match_list)
apiNbaRouter.get('/api/nba/match/boxscore', nba_match.nba_match_boxscore)
apiNbaRouter.get('/api/nba/game/player', nba_match.nba_game_player)
apiNbaRouter.get('/api/nba/summary/best', nba_match.nba_summary_best)
apiNbaRouter.get('/api/nba/game/team/summary', nba_match.nab_game_team_summary)

//排行
//球队排行榜
apiNbaRouter.get('/api/nba/rank', nba_rank.nab_rank)
apiNbaRouter.get('/api/nba/data/top/:mid', nba_team.data_top)
apiNbaRouter.get('/api/nba/team/latest/top5', nba_team.team_latest_top5)
apiNbaRouter.get('/api/nba/team/standing/:type', nba_team.team_standing)

module.exports = apiNbaRouter
