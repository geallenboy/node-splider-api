const mysql = require('mysql') // 调用MySQL模块
// 创建一个connection
const connection = mysql.createConnection({
  host: 'localhost', // 主机
  user: 'root', // MySQL认证用户名
  password: '12345678',
  port: '3306',
  database: 'node-api',
  charset: 'utf8mb4_general_ci'
})
// 创建一个connection
connection.connect( (err)=> {
  if (err) {
    console.log('[query] 22- :' + err)
    return
  }
  console.log('数据库链接成功-connection success')
})
module.exports = connection
