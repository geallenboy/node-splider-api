const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaViews = require('koa-views')
const cors = require('koa2-cors')
const static_serve = require("koa-static")
const app = new Koa()
const webRouter = require('./routes/web_router')
const sqlNbaRouter = require('./routes/sql_nba_router')
const apiNbaRouter = require('./routes/api_nba_router')

app.use(cors())
app.use(koaLogger())
app.use(static_serve(__dirname + "/static"));
app.use(new bodyParser())
app.use(sqlNbaRouter.routes()).use(sqlNbaRouter.allowedMethods())
app.use(apiNbaRouter.routes()).use(apiNbaRouter.allowedMethods())

app.use(koaViews(__dirname + "/views", {
  extension:'ejs'
}))
app.use(webRouter.routes()).use(webRouter.allowedMethods())

module.exports = app