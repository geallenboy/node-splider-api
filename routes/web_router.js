const webRouter = require('koa-router')()
const mKoa = require('../controllers/web/index')

webRouter.get('/',async (ctx)=>{

  await ctx.render('index',{
    title:'index'
  })
});
webRouter.get('/web/nba',async (ctx)=>{
  await ctx.render('nba.ejs',{
    title:'index'
  })
});




module.exports = webRouter