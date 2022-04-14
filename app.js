const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaViews = require('koa-views')
const cors = require('koa2-cors')
const static_serve = require('koa-static')
const app = new Koa()
const fs = require('fs')
const webRouter = require('./routes/web_router')
const apiNbaRouter = require('./routes/api_nba_router')
const koaRouter = require('koa-router')()
app.use(cors())
app.use(koaLogger())
app.use(static_serve(__dirname + '/static'))
app.use(new bodyParser())
app.use(
  koaViews('views', {
    extension: 'ejs'
  })
)
koaRouter.get('/vite2-react17', async (ctx) => {
  ctx.render('/vite2-react17/index.html')
})
app.use(apiNbaRouter.routes()).use(apiNbaRouter.allowedMethods())

app.use(webRouter.routes()).use(apiNbaRouter.allowedMethods())

module.exports = app
