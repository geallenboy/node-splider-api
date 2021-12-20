const router = require('koa-router')()
const nba = require('../controllers/api/nba')
const nba_team_list = require('../controllers/api/nba/team_list')
const nba_team_info = require('../controllers/api/nba/team_info')

router.get('/api/nba/vs/:start/:end',nba.nba_vs);//赛程
router.get('/api/nba/rank',nba.nba_rank); //排行
router.get('/api/nba/qystats/:year',nba.nba_qystats); //球员信息
router.get('/api/nba/nba_qdstats/:year',nba.nba_qdstats); //球队信息
router.get('/api/nba/nba_player_data',nba.nba_player_data); //球员数据



router.get('/api/nba/team/insert',nba_team_list.nba_team_list_insert); //添加球队列表
router.get('/api/nba/team/list',nba_team_list.nba_team_list); //查询所有球队列表


router.get('/api/nba/team/info/list',nba_team_info.nba_team_info_list); //球队信息

module.exports = router