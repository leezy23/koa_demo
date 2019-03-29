const Router = require('koa-router');
const router = new Router();

router.prefix('/A');
router
    .get('/aaa',(ctx,next)=>{
        ctx.body = "hello A module router"
    })
    .get('/apath',async (ctx,next)=>{
        ctx.body = "hello A module path apath"
    });

module.exports = router;
