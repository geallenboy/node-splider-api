const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")
const {query_func,add_func} = require('../../../utils/mysql')
const {team_list_url,team_info_url} = require("../../../config/nab_url")
const {team_list_sql,team_one_sql,
  team_list_one_sql,team_list_insert,
  team_insert} = require('../../../config/nba_mysql')


module.exports ={
  /**
   * 添加nba球队列表
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_team_list(ctx,next){
    let return_result=[];
    try {
      let team_list_get = await requestGet({
        url: 'http://localhost:3003/nba/team_list.json',
        headers: headers
      })
      let res_sta =JSON.parse(team_list_get.data).result.data;
      if(res_sta){
        for (const key_i of Object.keys(res_sta)) {
          const ew_name = key_i.indexOf('eastern')===-1?'western':'eastern';
          let obj2_res2 = Object.keys(res_sta[key_i]);
          for (const key_j of obj2_res2) {
            let obj2_res3 = res_sta[key_i][key_j];
            for (const key_z of obj2_res3) {
              let res_su = await query_func(team_list_one_sql(key_z.tid))
              if(res_su.code===200&&res_su.data.length===0){
                let insert_result = await add_func(team_list_insert(key_z,ew_name,key_j))
                if(insert_result.code===200){
                  return_result.push(`${key_z.tid} ${insert_result.msg}`)
                }else{
                  return_result.push(`${key_z.tid} ${insert_result.msg}`)
                }
              }else{
                return_result.push(`${key_z.tid} 数据已存在`)
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
   * 添加nba球队信息
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_team_info(ctx,next){
    let return_result=[];
    try {
      let query_team_list = await query_func(team_list_sql)
    if(query_team_list.code===200&&query_team_list.data.length>0){
      let result= JSON.parse(JSON.stringify(query_team_list.data));
      for (const res1 of result) {
        let query_team_one = await query_func(team_one_sql(res1.tid))
        if(query_team_one.code===200&&query_team_one.data.length===0){
          let get_team_info = await requestGet({
            url: 'http://localhost:3003/nba/team_info.json',//team_info_url(res1.tid)
            headers: headers
          })
          if(get_team_info.code===200&&get_team_info.data.length>0){
            let team_info_data =JSON.parse(get_team_info.data).result.data;
            let Obj_keys = team_info_data[Object.keys(team_info_data)[0]];
            let i_res = await add_func(team_insert(Obj_keys))
            if(i_res.code===200){
              return_result.push(`${Obj_keys.tid} ${i_res.msg}`)
            }else{
              return_result.push(`${Obj_keys.tid} ${i_res.msg}`)
            }
          }else{
            return_result.push(`请求失败：${get_team_info.msg}`)
          }
          
        }else{
          return_result.push(`${res1.tid} 数据已存在`)
        }
      }
    }else{
      return_result.push(`查询失败`)
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
  }
}
  