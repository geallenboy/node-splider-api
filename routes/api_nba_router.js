const apiNbaRouter = require('koa-router')()
const nba = require('../controllers/api/nba')
const nba_match = require('../controllers/api/nba/match')
const nba_team = require('../controllers/api/nba/team')


apiNbaRouter.get('/api/nba/vs/:start/:end',nba.nba_vs);//赛程
apiNbaRouter.get('/api/nba/rank',nba.nba_rank); //排行
apiNbaRouter.get('/api/nba/qystats/:year',nba.nba_qystats); //球员信息
apiNbaRouter.get('/api/nba/nba_qdstats/:year',nba.nba_qdstats); //球队信息
apiNbaRouter.get('/api/nba/nba_player_data',nba.nba_player_data); //球员数据

apiNbaRouter.get('/api/nba/match/list',nba_match.nba_match_list);
apiNbaRouter.get('/api/nba/match/boxscore',nba_match.nba_match_boxscore); 
apiNbaRouter.get('/api/nba/game/player',nba_match.nba_game_player); 
apiNbaRouter.get('/api/nba/summary/best',nba_match.nba_summary_best); 
apiNbaRouter.get('/api/nba/game/team/summary',nba_match.nab_game_team_summary); 

apiNbaRouter.get('/api/nba/data/top/:mid',nba_team.data_top); 
apiNbaRouter.get('/api/nba/team/latest/top5',nba_team.team_latest_top5);
apiNbaRouter.get('/api/nba/team/standing/:type',nba_team.team_standing);


module.exports = apiNbaRouter