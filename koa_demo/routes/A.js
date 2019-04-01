const Router = require('koa-router');
const router = new Router();
const constVar = require('../config/default');
router.prefix('/A');
const jwt = require('jsonwebtoken');
router
    .get('/user',async (ctx)=>{
        let token = ctx.header.authorization;

        if (!token) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "Headers Token不能为空"
            }
        }

        jwt.verify(token, constVar.privateKey,function (err, payload) {
           if(err){
               ctx.response.status = 500;
               ctx.body = {
                   code: 500,
                   message: err
               };
               return false;
           }else {
               const user = {
                   id: payload.id,
                   username: payload.username,
                   password: payload.password
               };

               ctx.response.status = 200;
               ctx.body = {
                   code: 200,
                   message: '查询成功！',
                   data: user
               }
           }
        });

    })
    .get('/apath',async (ctx,next)=>{
        ctx.body = "hello A module path apath"
    });

module.exports = router;
