const MYSQL = require('mysql') // 调用MySQL模块
// 创建一个connection
const connection = MYSQL.createConnection({
  host: '127.0.0.1', // 主机
  user: 'root', // MySQL认证用户名
  password: '12345678',
  port: '3306',
  database: 'blog_cms',
  charset: 'UTF8_GENERAL_CI'
})

module.exports = connection
