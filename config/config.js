
/**
 * 保存球队图片路径
 * @param {*} tid 
 * @returns 
 */
const team_img_path = (tid,png='png')=>{
  return path.join(`./static/images/team/${tid}.${png}`);
}
/**
 * 保存球员图片路径
 * @param {*} tid 
 * @returns 
 */
 const player_img_path = (pid,png='png')=>{
  return path.join(`./static/images/player/${pid}.${png}`);
}

module.exports ={
  team_img_path,
  player_img_path
}