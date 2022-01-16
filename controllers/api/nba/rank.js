const sd = require('silly-datetime');
const {requestGet} = require("../../../utils/httpServer")
const {headers} = require('../../../config/http')
//排名
module.exports = {
    /**
     * 球队排名
     * @param {*} ctx 
     * @param {*} next 
     */
    async nab_rank(ctx,next){
      const _type= ctx.request.query.type||'';
      const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team_standing&a=${_type}`
     console.log(_type,url,222)
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
  }