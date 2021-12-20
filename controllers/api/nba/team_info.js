const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")
const connection = require('../../../config/dbs')

module.exports ={
  async nba_team_info_list(ctx,next){
    let result = new Promise((resolve,reject)=>{
      const query_sql = `select * from team_list`;
      connection.query(query_sql, async (err, result) =>{
      if (err) {
        console.log('[查询nba_team_list] - :' + err)
      } else {
        console.log(`nba_team_list:${query_sql}`);
      }
      let select_result= JSON.parse(JSON.stringify(result));
      if(select_result.length>0){
        select_result.forEach( (val)=>{
          const query_sql_one = `select * from team where tid='${val.tid}' `;
          connection.query(query_sql_one, async(err2, row2) =>{
              if(err2){
                console.log(`select失败:${err2}`);
                reject(err2)
              }else{
                if(row2.length===0){
                  await requestGet({
                    url:`http://slamdunk.sports.sina.com.cn/api?p=radar&p=radar&s=team&a=info&tid=${val.tid}`,
                    headers: headers
                  }).then((res)=>{
                    let res_sta =JSON.parse(res.data).result.data;
                    let Obj_keys = res_sta[Object.keys(res_sta)[0]];
                    const inster_sql = `insert into team
                            (tid,market,name,market_cn,name_cn,alias,conference,division,state,city,venue,coach,executive,boss,champions,champion_season,history) VALUES 
                            ('${Obj_keys.tid}','${Obj_keys.market}','${Obj_keys.name}','${Obj_keys.market_cn}','${Obj_keys.name_cn}','${Obj_keys.alias}','${Obj_keys.conference}','${Obj_keys.division}','${Obj_keys.state}','${Obj_keys.city}','${Obj_keys.venue}','${Obj_keys.coach}','${Obj_keys.executive}','${Obj_keys.boss}','${Obj_keys.champions}','${Obj_keys.champion_season}','${Obj_keys.history}')`;
                    console.log('INSERT_SQL:'+inster_sql)
                    connection.query(inster_sql, (err3, row3) =>{
                      if(err3){
                        console.log(`INSERT失败:${err3}`);
                        reject(err3)
                      }else{
                        console.log(`INSERT成功:${row3}`);
                        resolve(row3)
                      }

                    })
                  }).catch(err=>{
                    console.log(err)
                  })
                }else{
                  resolve(row2)
                }
                
              }
          })
          
        })
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
  }
}