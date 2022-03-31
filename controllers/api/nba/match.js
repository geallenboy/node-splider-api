const sd = require('silly-datetime');
const {requestGet} = require("../../../utils/httpServer")
const {headers} = require('../../../config/http')
//
module.exports = {
    /**
     * 比赛球队总览
     * @param {*} ctx 
     * @param {*} next 
     */
    async nab_game_team_summary(ctx,next){
        const _mid= ctx.request.query.mid||'';
        const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=summary&a=game_team&mid=${_mid}`
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
     * 表现最好的
     * @param {*} ctx 
     * @param {*} next 
     */
    async nba_summary_best(ctx,next){
        const _mid= ctx.request.query.mid||'';
        const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=summary&a=best&mid=${_mid}`
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
     * 比赛信息
     */
    async nba_game_player(ctx,next){
        const _mid= ctx.request.query.mid||'';
        const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=summary&a=game_player&mid=${_mid}`
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
     * 赛程球队得分
     * @param {*} ctx 
     * @param {*} next 
     */
    async nba_match_boxscore(ctx,next){
        const _mid= ctx.request.query.mid||'';
        const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=boxscore&a=match&mid=${_mid}`
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
     * 赛程列表
     * @param {*}} ctx 
     * @param {*} next 
     */
    async nba_match_list(ctx,next){
        const _date = ctx.request.query.date||sd.format(new Date(), 'YYYY-MM-DD');
        const _span= ctx.request.query.span||6;
        console.log(ctx.request.query.date)
        const url = `https://slamdunk.sports.sina.com.cn/api?p=radar&s=schedule&a=date_span&date=${_date}&span=${_span}`
        await requestGet({
            url: url,
            headers: headers
        }).then((res)=>{
            if(res.code===200){
                ctx.response.body={
                    code: 200,
                    data: JSON.parse(res.data).result.data.matchs,
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