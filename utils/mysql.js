const connection = require('../config/dbs')

const query_func = (sql)=>{
  return new Promise( (resolve, reject)=>{
          connection.query(sql, (err, result) =>{
            if (err) {
              console.log('[查询数据失败] - :' + err)
              reject({
                code:500,
                msg:err,
                data:[]
              })
            } else {
              console.log(`[查询数据成功] - :${result}`);
              resolve({
                code:200,
                data:result,
                msg:'查询数据成功'
              })
            }
          })
      })
}

const add_func = (sql)=>{
  return new Promise((resolve,reject)=>{
    connection.query(sql, (err, result) =>{
      if (err) {
        console.log('[添加数据失败] - :' + err)
        reject({
          code:500,
          msg:err,
          data:[]
        })
      } else {
        console.log(`[添加数据成功] - :${result}`);
        resolve({
          code:200,
          data:result,
          msg:'添加数据成功'
        })
      }
    })
})
}

module.exports = {
  query_func,
  add_func
}