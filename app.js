const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaViews = require('koa-views')
const cors = require('koa2-cors')
const static_serve = require("koa-static")
const app = new Koa()
const webRouter = require('./routes/webRouter')
const sqlRouter = require('./routes/sqlRouter')
const apiRouter = require('./routes/apiRouter')

app.use(cors())
app.use(koaLogger())
app.use(static_serve(__dirname + "/static"));
app.use(new bodyParser())
app.use(sqlRouter.routes()).use(sqlRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.use(koaViews(__dirname + "/views", {
  extension:'ejs'
}))
app.use(webRouter.routes()).use(webRouter.allowedMethods())
app.listen(3002, () => {
  console.log('Web server started at port 3002!')
})

module.exports = app