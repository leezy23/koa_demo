const Router = require('koa-router');
const router = new Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const constVar =require('../config/default');

router
    .post('/login', async (ctx)=>{
        console.log("body: ", ctx.request.body);

        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        console.log('username:',username);
        console.log('password:',password);


        let user_obj = await User.findOne({
            where:{
                username:username
            }
        });

        if(user_obj === null || user_obj === undefined || user_obj.password !== password){
            ctx.body = ({
                state:-1,
                msg:"用户名或密码错误"
            });
            return false;
        }


        // 生成token,返回token
        let token = jwt.sign({
            username:user_obj.username,
            password:user_obj.password
        },constVar.privateKey,{
            expiresIn: 30*60
        });


        ctx.body = ({
            state:0,
            msg:"登录成功",
            data:token
        });
        return true;
});

module.exports = router;
