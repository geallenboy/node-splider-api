const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")
const connection = require('../../../config/dbs')
const fs = require('fs')
const path = require('path')
const { team_list_sql, team_list_one_sql, player_list_one_sql, player_list_insert, player_insert, player_one_sql, player_list_sql } = require('../../../config/nba_mysql')
const { query_func, add_func } = require('../../../utils/mysql')
let file = path.join('./static/2021_player_data.json');

module.exports ={

  async nab_season_matchs(ctx,next){
    let season_match = await requestGet({
      url:'http://localhost:3003/nba/season_matchs.json',
      // url:`https://slamdunk.sports.sina.com.cn/api?page=${pageArr[j]}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${res1[i].pid}&season_type=reg&season=2021`,
      headers: headers
    })

    console.log(JSON.parse(season_match.data).result.data,22)
  },

  async nba_obj(ctx,next){
    const res1 = await new Promise((resolve,reject)=>{
        const query_sql = `select * from player`;
        connection.query(query_sql, (err, result) =>{
          if (err) {
            console.log('[查询player] - :' + err)
            reject(err)
          } else {
            console.log(`player:${query_sql}`);
            resolve(result)
          }
        })
    })
    let res2=[],pageArr=[1];
    // res2 = await requestGet({
    //   url:'http://localhost:3003/2021_player_data.json',
    //   // url:`https://slamdunk.sports.sina.com.cn/api?page=${pageArr[j]}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${res1[i].pid}&season_type=reg&season=2021`,
    //   headers: headers
    // })
    for (let i in res1) {
      if(i<100){
        for(let j in pageArr){
          // console.log("====>page:"+pageArr[j],res1[i].pid)
          res2[res2.length] = await requestGet({
            url:'http://localhost:3003/nba/player_game.json',
            // url:`https://slamdunk.sports.sina.com.cn/api?page=${pageArr[j]}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${res1[i].pid}&season_type=reg&season=2021`,
            headers: headers
          })
        }
      }
    }
    // await new Promise((resolve,reject)=>{
    //   fs.writeFile(file, JSON.stringify(res2, null, 4), (err) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     resolve('写入成功')
    //     console.log('写入成功')
    //   })
    // })
    let res4=[];
    // console.log(JSON.parse(res2.data).length,444)
    // let new_res2 = JSON.parse(res2.data)
    let sum_s = 0;
    for (let j = 0; j < res2.length; j++) {
      console.log("操作请求接口数据返回-循环："+j)
      // sum_s++;
      let rs =JSON.parse(res2[j].data).result.data;
      let pt = rs['paginator'];
      let pi = rs['player'];
      let li = rs['league'];
      let _games = rs['games']||[];
      let res3=false;
      for (let z = 0; z < _games.length; z++) {
        const gs = _games[z];
        sum_s++;
        res3 = await new Promise((resolve,reject)=>{  
          const query_sql_one = `select * from player_data where mid = '${gs.mid}' and opp_tid = '${gs.opp_tid}' and pid = '${pi.pid}' `;
          connection.query(query_sql_one, (err2, row2) =>{
            if(err2){
              console.log(`查询数据失败:${err2}`);
              reject(false)
            }else{
              if(row2.length<=0){
                resolve(true)
              }else{
                console.log('暂无数据添加')
                resolve(false)
              }
            }
          })
        })
        if(res3){
          res4[res4.length] = await new Promise((resolve,reject)=>{
            const inster_sql = `insert into player_data
            (season_type,season,pid,mid,date,time,team_name,score,opp_team_name,opp_tid,opp_score,host,minutes,points,field_goals_made,field_goals_att,field_goals_pct,three_points_made,three_points_att,three_points_pct,free_throws_made,free_throws_att,free_throws_pct,offensive_rebounds,defensive_rebounds,rebounds,assists,turnovers,assists_turnover_ratio,steals,blocks,personal_fouls) VALUES 
            ("${li.type}","${li.season}","${pi.pid}","${gs.mid}","${gs.date}","${gs.time}","${gs.team_name}","${gs.score}","${gs.opp_team_name}","${gs.opp_tid}","${gs.opp_score}","${gs.host}","${gs.minutes}","${gs.points}","${gs.field_goals_made}","${gs.field_goals_att}","${gs.field_goals_pct}","${gs.three_points_made}","${gs.three_points_att}","${gs.three_points_pct}","${gs.free_throws_made}","${gs.free_throws_att}","${gs.free_throws_pct}","${gs.offensive_rebounds}","${gs.defensive_rebounds}","${gs.rebounds}","${gs.assists}","${gs.turnovers}","${gs.assists_turnover_ratio}","${gs.steals}","${gs.blocks}","${gs.personal_fouls}")`;
            console.log("添加sql语句:"+inster_sql)
              connection.query(inster_sql, (err3, row3) =>{
              if(err3){
                console.log(`添加数据失败:${err3}`);
                reject(err3)
              }else{
                console.log(`添加数据成功:${row3}`);
                resolve(row3)
              }
            })
          })
        }else{
          res4[res4.length] ='数据已存在';
        }
      }
    }
  
    console.log('8888',sum_s)
 
    ctx.body = {
        code: 200,
        data: res4,
        msg: 'success',
    }
  },
  async nba_player_game_data(ctx,next){
    let result = new Promise(async (resolve,reject)=>{
      const query_sql = `select * from player`;
      connection.query(query_sql, async (err, result) =>{
        if (err) {
          console.log('[查询player] - :' + err)
        } else {
          console.log(`player:${query_sql}`);
        }
        let select_result= JSON.parse(JSON.stringify(result));
        if(select_result.length>0){
          for (let index = 1; index < 10; index++) {
            let val = select_result[index];
             let page_arr = [1]
             for (let z = 1; z <= page_arr.length; z++) {
              await requestGet({
                // url:'http://localhost:3003/nba/player_game.json',
                url:`https://slamdunk.sports.sina.com.cn/api?page=${z}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${val.pid}&season_type=reg`,
                headers: headers
              }).then(res=>{
                let rs =JSON.parse(res.data).result.data;
                let pt = rs['paginator'];
                let pi = rs['player'];
                let li = rs['league'];
                let gs = rs['games']||[];
                console.log(pi.last_name,gs.length,22)
                if(rs&&gs.length>0){
                    const query_sql_one = `select * from player_data where mid='${gs.mid}'`;
                    connection.query(query_sql_one,  (err2, row2) =>{
                      if(err2){
                        console.log(`select失败:${err2}`);
                        reject(err2)
                      }else{
                        if(row2.length<=0){
                          const inster_sql = `insert into player_data
                          (season_type,season,pid,mid,date,time,team_name,score,opp_team_name,opp_tid,opp_score,host,minutes,points,field_goals_made,field_goals_att,field_goals_pct,three_points_made,three_points_att,three_points_pct,free_throws_made,free_throws_att,free_throws_pct,offensive_rebounds,defensive_rebounds,rebounds,assists,turnovers,assists_turnover_ratio,steals,blocks,personal_fouls) VALUES 
                          ("${li.type}","${li.season}","${pi.pid}","${gs.mid}","${gs.date}","${gs.time}","${gs.team_name}","${gs.score}","${gs.opp_team_name}","${gs.opp_tid}","${gs.opp_score}","${gs.host}","${gs.minutes}","${gs.points}","${gs.field_goals_made}","${gs.field_goals_att}","${gs.field_goals_pct}","${gs.three_points_made}","${gs.three_points_att}","${gs.three_points_pct}","${gs.free_throws_made}","${gs.free_throws_att}","${gs.free_throws_pct}","${gs.offensive_rebounds}","${gs.defensive_rebounds}","${gs.rebounds}","${gs.assists}","${gs.turnovers}","${gs.assists_turnover_ratio}","${gs.steals}","${gs.blocks}","${gs.personal_fouls}")`;
                          console.log("INSERT_SQL:"+inster_sql)
                            connection.query(inster_sql, (err3, row3) =>{
                            if(err3){
                              console.log(`INSERT失败:${err3}`);
                              reject(err3)
                            }else{
                              console.log(`INSERT成功:${row3}`);
                              resolve(row3)
                            }
                          })
                        }else{
                          reject('暂无添加数据')
                        }
                      }
                    })
                }else{
                  resolve(gs)
                }
              })
             }

            
          }
        }else{
          resolve(result)
        }
      })
      
      
    })
    
    
    await result.then((val)=>{
      ctx.body = {
        code: 200,
        data: val,
        msg: 'success',
      }
    }).catch(err=>{
      ctx.body = {
        code: 500,
        data: err,
        msg: 'error',
      }
    })
  }, 
  async nba_play_insert(ctx,next){

    let return_result=[];
    let result = await query_func(player_list_sql)
    if(result.code===200){
      let select_result= JSON.parse(JSON.stringify(result)).data;
      if(select_result.length>0){
        for (const s_r of select_result) {
          try {
            let get_player =  await requestGet({
              url:'http://localhost:3003/nba/player.json',
              headers: headers
            })
            if(get_player.code===200&&get_player.data.length>0){
              let player_data =JSON.parse(get_player.data).result.data;
              console.log(player_data,888)
              let res_su = await query_func(player_one_sql(player_data.pid))
              if(res_su.code===200&&res_su.data.length===0){
                let insert_result = await add_func(player_insert(s_r,player_data))
                if(insert_result.code===200){
                  return_result.push(`${player_data.pid} ${insert_result.msg}`)
                }else{
                  return_result.push(`${player_data.pid} ${insert_result.msg}`)
                }
              }else{
                return_result.push(`${player_data.pid} 数据已存在`)
              }
            }else{
              return_result.push(`没有数据`)
            }
          } catch (error) {
            return_result.push(`请求异常`)
            console.log(error)
          }
        }
      }
    }else{
      return_result.push(`查询异常`)
    }
    ctx.body = {
      code: 200,
      data: return_result,
      msg: 'success',
    }
  },
  /**
   * 添加球员列表
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_play_list_insert(ctx,next){
    let return_result=[];
    let result = await query_func(team_list_sql)
    
    if(result.code===200){
      let select_result= JSON.parse(JSON.stringify(result)).data;
  
      if(select_result.length>0){
        for (const s_r of select_result) {
          try {
            let get_player_list =  await requestGet({
              url:'http://localhost:3003/nba/player_list.json',
              headers: headers
            })
            if(get_player_list.code===200&&get_player_list.data.length>0){
              
              let player_list_data =JSON.parse(get_player_list.data).result.data;
              let player_info = player_list_data['team'];
              let player_roster = player_list_data['roster'];
              if(player_roster&&player_roster.length>0){
                for (const player_r of player_roster) {
                  let res_su = await query_func(player_list_one_sql(player_r.pid))
                  if(res_su.code===200&&res_su.data.length===0){
                    let insert_result = await add_func(player_list_insert(player_info,player_r))
                    if(insert_result.code===200){
                      return_result.push(`${player_r.pid} ${insert_result.msg}`)
                    }else{
                      return_result.push(`${player_r.pid} ${insert_result.msg}`)
                    }
                  }else{
                    return_result.push(`${player_r.pid} 数据已存在`)
                  }
                }
              }else{
                return_result.push(`player_roster 没有数据`)
              }
            }
          } catch (error) {
            return_result.push(`请求异常`)
            console.log(error)
          }
          
         
        }
      }
      
    }else{
      return_result.push(`查询异常`)
    }

    ctx.body = {
      code: 200,
      data: return_result,
      msg: 'success',
    }
    
  }
}