const {requestGet} = require("../../../utils/httpServer")
const {headers} = require('../../../config/http')

module.exports = {
  /**
   * 球队列表
   * @param {*} ctx 
   * @param {*} next 
   */
   async team_list(ctx,next){
    const _type= ctx.params.type||'team_top';
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=leaders&a=${_type}&season_type=reg`
    await requestGet({
        url: url,
        headers: headers
    }).then((res)=>{
        if(res.code===200){
            ctx.response.body={
                code: 200,
                data: JSON.parse(res.data).result.data,
                msg: 'success',
            }
        }else{
            ctx.response.body={
                code: 500,
                data: '',
                msg: res.data,
            }
        }
    })
  },
  /**
   * 本赛季常规赛数据之最(球员，球队)
   * @param {*} ctx 
   * @param {*} next 
   */
   async data_top(ctx,next){
    const _type= ctx.params.type||'team_top';
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=leaders&a=${_type}&season_type=reg`
    await requestGet({
        url: url,
        headers: headers
    }).then((res)=>{
        if(res.code===200){
            ctx.response.body={
                code: 200,
                data: JSON.parse(res.data).result.data,
                msg: 'success',
            }
        }else{
            ctx.response.body={
                code: 500,
                data: '',
                msg: res.data,
            }
        }
    })
  },
  /**
   * 球队最近top5比赛
   * @param {*} ctx 
   * @param {*} next 
   */
  async team_latest_top5(ctx,next){
   
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=schedule&a=latest&limit=5`
    await requestGet({
        url: url,
        headers: headers
    }).then((res)=>{
        if(res.code===200){
            ctx.response.body={
                code: 200,
                data: JSON.parse(res.data).result.data,
                msg: 'success',
            }
        }else{
            ctx.response.body={
                code: 500,
                data: '',
                msg: res.data,
            }
        }
    })
  },
  /**
   * 球队排名
   */
  async team_standing(ctx,next){
    const _type= ctx.params.type||'conference';
    const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team_standing&a=${_type}`
    await requestGet({
        url: url,
        headers: headers
    }).then((res)=>{
        if(res.code===200){
            ctx.response.body={
                code: 200,
                data: JSON.parse(res.data).result.data,
                msg: 'success',
            }
        }else{
            ctx.response.body={
                code: 500,
                data: '',
                msg: res.data,
            }
        }
    })
  }
}