const Router = require('koa-router');
const router = new Router();
const moment = require('moment');

router
    .get('/', (ctx)=>{
        console.log("==============================5");
        ctx.body = {
            state:0,
            msg:"请求成功"
        };
        console.log("==============================6");
    })
    .get('/index',(ctx, next)=>{
        console.log("==============================5");
        ctx.body = {
            state:0,
            msg:"欢迎来到首页",
            data:{
                name:"xq",
                age:20,
                article:{
                    id:1,
                    title:"从删库到跑路",
                    content:"此处省略一万字",
                    time:moment(Date.now()).format("YYYY/MM/DD HH:mm:ss")
                }
            }
        };
        console.log("==============================6");
    });

module.exports = router;
