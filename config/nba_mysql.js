//球队sql
const team_sql = 'select * from team';
//球员sql
const player_sql = 'select * from player'
//球员列表sql
const player_list_sql = 'select * from player_list'
//球员列表sql
const player_data_sql = 'select * from player_data';

/**
 * 插入player_data信息
 * @param {*} obj 
 * @returns 
 */
 const player_data_insert=(li,pi,gs)=>{
  return `insert into player_data
  (season_type,season,pid,mid,date,time,team_name,score,opp_team_name,opp_tid,opp_score,host,minutes,points,field_goals_made,field_goals_att,field_goals_pct,three_points_made,three_points_att,three_points_pct,free_throws_made,free_throws_att,free_throws_pct,offensive_rebounds,defensive_rebounds,rebounds,assists,turnovers,assists_turnover_ratio,steals,blocks,personal_fouls) VALUES 
  ("${li.type}","${li.season}","${pi.pid}","${gs.mid}","${gs.date}","${gs.time}","${gs.team_name}","${gs.score}","${gs.opp_team_name}","${gs.opp_tid}","${gs.opp_score}","${gs.host}","${gs.minutes}","${gs.points}","${gs.field_goals_made}","${gs.field_goals_att}","${gs.field_goals_pct}","${gs.three_points_made}","${gs.three_points_att}","${gs.three_points_pct}","${gs.free_throws_made}","${gs.free_throws_att}","${gs.free_throws_pct}","${gs.offensive_rebounds}","${gs.defensive_rebounds}","${gs.rebounds}","${gs.assists}","${gs.turnovers}","${gs.assists_turnover_ratio}","${gs.steals}","${gs.blocks}","${gs.personal_fouls}")`;
}
/**
 * 通过mid,opp_tid,pid查询player_data的数据
 * @param {*} tid 
 * @returns 
 */
 const player_data_one_sql =(gs,pi)=>{
  return `select * from player_data where mid='${gs.mid}' and opp_tid = '${gs.opp_tid}' and pid = '${pi.pid}'`;
}
/**
 * 通过tid查询team的数据
 * @param {*} tid 
 * @returns 
 */
const team_one_sql =(tid)=>{
  return `select * from team where tid='${tid}'`;
}
/**
 * 通过pid查询player的数据
 * @param {*} pid 
 * @returns 
 */
 const player_one_sql = (pid='')=>{
  return `select * from player where pid='${pid}' `;
}
/**
 * 通过pid查询player_list的数据
 * @param {*} pid 
 * @returns 
 */
 const player_list_one_sql = (pid='')=>{
  return `select * from player_list where pid='${pid}' `;
}
//查询team_list数据
const team_list_sql = 'select * from team_list'
/**
 * 通过tid查询team_list的数据
 * @param {*} tid 
 * @returns 
 */
const team_list_one_sql = (tid='')=>{
  return `select * from team_list where tid='${tid}' `;
}
/**
 * 插入player队员信息
 * @param {*} obj 
 * @returns 
 */
 const player_insert=(val,rs)=>{
  return  `insert into player
  (team_name,season,tid,pid,first_name,first_name_cn,last_name,last_name_cn,jersey_number,position,birthdate,age,experience,college,centimeter,kilo,nation,wingspan,reach,salary,draft_year,draft_round,draft_pick,feet,pound) VALUES 
  ("${val.team_name}","${val.season}","${rs.tid}","${rs.pid}","${rs.first_name}","${rs.first_name_cn}","${rs.last_name}","${rs.last_name_cn}","${rs.jersey_number}","${rs.primary_position}","${rs.birthdate}","${rs.age}","${rs.experience}","${rs.college}","${rs.centimeter}","${rs.kilo}","${rs.nation}","${rs.wingspan}","${rs.reach}","${rs.salary}","${rs.draft_year}","${rs.draft_round}","${rs.draft_pick}","${val.feet}","${val.pound}")`;
}
/**
 * 插入player_list队员信息
 * @param {*} obj 
 * @returns 
 */
 const player_list_insert=(p_i,els)=>{
  return `insert into player_list
  (team_name,season,tid,pid,first_name,first_name_cn,last_name,last_name_cn,jersey_number,position,birthdate,age,experience,feet,centimeter,pound,kilo,college) VALUES 
  ("${p_i.name}","${p_i.season}","${p_i.tid}","${els.pid}","${els.first_name}","${els.first_name_cn}","${els.last_name}","${els.last_name_cn}","${els.jersey_number}","${els.position}","${els.birthdate}","${els.age}","${els.experience}","${els.feet}","${els.centimeter}","${els.pound}","${els.kilo}","${els.college}")`;
}
/**
 * 插入team_list球队列表数据
 * @param {*} k3 
 * @param {*} ew_name 
 * @param {*} k1 
 * @returns 
 */
const team_list_insert=(k3,ew_name,k1)=>{
  return `insert into team_list (tid,team_market,team_name,team_market_cn,team_name_cn,division,area) VALUES ('${k3.tid}','${k3.team_market}','${k3.team_name}','${k3.team_market_cn}','${k3.team_name_cn}','${ew_name}','${k1}')`;
}

/**
 * 插入team球队信息
 * @param {*} obj 
 * @returns 
 */
const team_insert=(obj)=>{
  return `insert into team (tid,market,name,market_cn,name_cn,alias,conference,division,state,city,venue,coach,executive,boss,champions,champion_season,history) VALUES 
  ('${obj.tid}','${obj.market}','${obj.name}','${obj.market_cn}','${obj.name_cn}','${obj.alias}','${obj.conference}','${obj.division}','${obj.state}','${obj.city}','${obj.venue}','${obj.coach}','${obj.executive}','${obj.boss}','${obj.champions}','${obj.champion_season}','${obj.history}')`;
}

module.exports = {
  player_sql,
  player_data_sql,
  player_data_one_sql,
  player_data_insert,
  player_insert,
  player_one_sql,
  player_list_sql,
  player_list_insert,
  player_list_one_sql,
  team_sql,
  team_list_sql,
  team_one_sql,
  team_list_one_sql,
  team_list_insert,
  team_insert,
  
}