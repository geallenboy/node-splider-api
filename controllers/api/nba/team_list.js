const {headers} = require('../../../config/http')
const {requestGet} = require("../../../utils/httpServer")
const connection = require('../../../config/dbs')
const {nba_team_list_url} = require("../../../config/nab_url")

module.exports ={
  async nba_team_list(ctx,next){
    const query_sql = `select * from team_list`;
    let result = new Promise((resolve,reject)=>{
      connection.query(query_sql, (err, result) =>{
        if (err) {
          console.log('[查询nba_team_list] - :' + err)
        } else {
          console.log(`nba_team_list:${query_sql}`);
        }
        resolve(JSON.stringify(result))
       
      })
    })
    await result.then((val)=>{
      ctx.body = {
        code: 200,
        data: JSON.parse(val),
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
  async nba_team_list_update(ctx,next){

  },
  async nba_team_list_insert(ctx,next){
    
    let url2 = 'http://localhost:3003/nba/team_list.json';
    await requestGet({
      url: nba_team_list_url,
      headers: headers
    }).then((res)=>{
        let res_sta =JSON.parse(res.data).result.data;
        Object.keys(res_sta).map((k,v)=>{
          const ew_name = k.indexOf('eastern')===-1?'western':'eastern'
          Object.keys(res_sta[k]).map((k1,v1)=>{
            res_sta[k][k1].map((k3,v3)=>{
              const query_sql = `select * from team_list where tid='${k3.tid}' `;
              connection.query(query_sql, (err, row, fields) =>{
                if (err) {
                  console.log('[查询sql] - :'+query_sql)
                  console.log('[查询team_list] - :' + err)
                } else {
                  console.log(`SELECT:${query_sql}`);
                  console.log(row)
                  if(row.length===0){
                    const inster_sql = `insert into team_list (tid,team_market,team_name,team_market_cn,team_name_cn,division,area) VALUES ('${k3.tid}','${k3.team_market}','${k3.team_name}','${k3.team_market_cn}','${k3.team_name_cn}','${ew_name}','${k1}')`;
                    connection.query(inster_sql, (err1, row1, fields1) =>{
                      if(err1){
                        console.log(`INSERT失败:${err1}`);
                      }else{
                        console.log(`INSERT成功:${inster_sql}`);
                      }
                    })
                  }
                }
              })
            })
          })
        })
        ctx.response.body={
          code: 200,
          data: res_sta,
          msg: 'success',
      }

    })
  
  },
    
}