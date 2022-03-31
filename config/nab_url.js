//获取所有球队列表
const team_list_url = 'https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team&a=hireracy';


/**
 * 通过tid获取球队的图片
 * @param {*} tid 
 * @returns 
 */
const team_img_url = (tid)=>{
  return `https://www.sinaimg.cn/lf/sports/2017nba/${tid}.png`;
}

/**
 * 通过pid获取球员的图片
 * @param {*} tid 
 * @returns 
 */
 const player_img_url = (pid)=>{
  return `https://www.sinaimg.cn/ty/nba/player/NBA_1_1/${pid}.png`;
}

const team_info_url =(tid)=>{
  return `http://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team&a=info&tid=${tid}`
}
module.exports={
  team_img_url,
  team_list_url,
  player_img_url,
  team_info_url
}