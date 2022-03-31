const sqlNbaRouter = require('koa-router')()
const nba_player = require('../controllers/sql/nba/player')
const nba_get_images = require('../controllers/sql/nba/get_images')
const nba_team = require('../controllers/sql/nba/team')
const nba_match = require('../controllers/sql/nba/match')
//---------赛程
//添加赛程
sqlNbaRouter.get('/sql/nba/match/insert',nba_match.nab_match_insert); 

//添加球队列表
sqlNbaRouter.get('/sql/nba/team/insert',nba_team.nba_team_list); 
//添加球队详细信息
sqlNbaRouter.get('/sql/nba/team/info/insert',nba_team.nba_team_info); 


//添加球员列表
sqlNbaRouter.get('/sql/nba/play/list/insert',nba_player.nba_play_list_insert);
//添加球员信息
sqlNbaRouter.get('/sql/nba/play/insert',nba_player.nba_play_insert);
//添加球员比赛数据
sqlNbaRouter.get('/sql/nba/player/game/data',nba_player.nba_player_game_data);

//保存图片
sqlNbaRouter.get('/sql/nba/player/logo',nba_get_images.nba_player_logo);
//保存图片
sqlNbaRouter.get('/sql/nba/team/logo',nba_get_images.nba_team_logo);


module.exports = sqlNbaRouter