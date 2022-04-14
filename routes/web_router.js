const webRouter = require('koa-router')()

webRouter.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'index'
  })
})
webRouter.get('/nba', async (ctx) => {
  await ctx.render('nba', {
    title: 'nba'
  })
})
module.exports = webRouter
