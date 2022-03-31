const request=require('request');
const fs = require('fs')
const {query_func} = require('../../../utils/mysql')
const {team_sql,player_sql} = require('../../../config/nba_mysql')
const {team_img_url,player_img_url} = require('../../../config/nab_url')
const {team_img_path,player_img_path} = require('../../../config/config')

module.exports ={
  /**
   * 通过查询team表获取所有球队logo图片保存到本地
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_team_logo(ctx,next){
    let result_list = [];
    let result =await query_func(team_sql)
    if(result.code===200){
      let select_result= JSON.parse(JSON.stringify(result.data));
      if(select_result.length>0){
        for (let index = 0; index < select_result.length; index++) {
          let val = select_result[index];
          if(!fs.existsSync(team_img_path(val.pid))){
            await request(team_img_url(val.pid)).pipe(fs.createWriteStream(team_img_path(val.pid),{
            'enconding':'binary'
            })).on('finish',()=>{
              console.log(`${val.pid}.png=>图片写入成功`)
              result_list[result_list.length] = `${val.pid}.png=>图片写入成功`
            })
          }else{
            console.log(`${val.pid}.png=>图片已存在`)
            result_list[result_list.length] = `${val.pid}.png=>图片已存在`
          }
        }
      }else{
        result_list[result_list.length] = `暂无数据`
      }
    }
    ctx.body = {
      code: 200,
      data: result_list,
      msg: 'success',
    }
   
  },
  /**
   * 获取nba球员logo图片保存到本地
   * @param {*} ctx 
   * @param {*} next 
   */
  async nba_player_logo(ctx,next){
    let result_list = [];
    let result =await query_func(player_sql)
    if(result.code===200){
      let select_result= JSON.parse(JSON.stringify(result.data));
      if(select_result.length>0){
        for (let index = 0; index < select_result.length; index++) {
          let val = select_result[index];
          if(!fs.existsSync(player_img_path(val.tid))){
            await request(player_img_url(val.tid)).pipe(fs.createWriteStream(player_img_path(val.tid),{
            'enconding':'binary'
            })).on('finish',()=>{
              console.log(`${val.tid}.png=>图片写入成功`)
              result_list[result_list.length] = `${val.tid}.png=>图片写入成功`
            })
          }else{
            console.log(`${val.tid}.png=>图片已存在`)
            result_list[result_list.length] = `${val.tid}.png=>图片已存在`
          }
        }
      }else{
        result_list[result_list.length] = `暂无数据`
      }
    }
    ctx.body = {
      code: 200,
      data: result_list,
      msg: 'success',
    }
  }
}