const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")
const { team_list_sql, player_list_one_sql, player_list_insert, player_insert, player_one_sql, player_list_sql, player_data_one_sql, player_data_insert } = require('../../../config/nba_mysql')
const { query_func, add_func } = require('../../../utils/mysql')


module.exports ={

  async nab_season_matchs(ctx,next){
    let season_match = await requestGet({
      url:'http://localhost:3003/nba/season_matchs.json',
      // url:`https://slamdunk.sports.sina.com.cn/api?page=${pageArr[j]}&limit=20&p=radar&p=radar&s=summary&a=player&pid=${res1[i].pid}&season_type=reg&season=2021`,
      headers: headers
    })

    console.log(JSON.parse(season_match.data).result.data,22)
  },
  /**
   * 球员比赛数据
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_player_game_data(ctx,next){
    let return_result=[];
    try {
      let result = await query_func(player_sql)
      if(result.code===200){
        let select_result= JSON.parse(JSON.stringify(result)).data;
        if(select_result.length>0){
          for (const val of select_result) {
            let page_arr = [1];
            for (let z = 1; z <= page_arr.length; z++) {
              let get_player_game=  await requestGet({
                url:'http://localhost:3003/nba/player_game.json',
                headers: headers
              })
              if(get_player_game.code===200&&get_player_game.data.length>0){
                let rs =JSON.parse(get_player_game.data).result.data;
                let pt = rs['paginator'];
                let pi = rs['player'];
                let li = rs['league'];
                let _games = rs['games']||[];
                if(rs&&_games.length>0){
                  for (const gs of _games) {
                    let res_su = await query_func(player_data_one_sql(gs,pi));
                    if(res_su.code===200&&res_su.data.length===0){
                      let insert_result = await add_func(player_data_insert(li,pi,gs))
                      if(insert_result.code===200){
                        return_result.push(`${gs.mid} ${insert_result.msg}`)
                      }else{
                        return_result.push(`${gs.mid} ${insert_result.msg}`)
                      }
                    }else{
                      return_result.push(`${gs.mid} 数据已存在`)
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      return_result.push(`请求异常`)
      console.log(error)
    }
    ctx.body={
      code: 200,
      data: return_result,
      msg: 'success',
    }
  }, 
  /**
   * 添加球员
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_play_insert(ctx,next){
    let return_result=[];
    try {
      let result = await query_func(player_list_sql)
      if(result.code===200){
        let select_result= JSON.parse(JSON.stringify(result)).data;
        if(select_result.length>0){
          for (const s_r of select_result) {
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
          }
        }
      }else{
        return_result.push(`查询异常`)
      }        
    } catch (error) {
      return_result.push(`请求异常`)
      console.log(error)
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