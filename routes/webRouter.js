const webRouter = require('koa-router')()
const mKoa = require('../controllers/web/index')

webRouter.get('/',async (ctx,next)=>{
  await ctx.render('index.ejs',{
    title:'index'
  })
});
webRouter.get('/web/nba',async (ctx,next)=>{
  await ctx.render('nba/index.ejs',{
    title:'index'
  })
});

module.exports = webRouter