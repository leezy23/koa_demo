const Router = require('koa-router');
const router = new Router();

router.prefix('/C');
router.get('/aaa',(ctx,next)=>{
    ctx.body = "hello A module router"
});

module.exports = router;
