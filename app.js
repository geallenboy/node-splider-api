const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const routers = require('./routes/apiRouter')
const static_serve = require("koa-static")
const app = new Koa()
const cors = require('koa2-cors')

app.use(cors())
app.use(koaLogger())
app.use(static_serve(__dirname + "/static"));
app.use(new bodyParser())
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3003, () => {
  console.log('Web server started at port 3002!')
})

module.exports = app