const Koa = require('koa');
const koaBody = require('koa-body');
const A = require('./routes/A');
const B = require('./routes/B');
const C = require('./routes/C');
const userLogin = require('./routes/userLogin');
const app = new Koa();

app.use(koaBody());

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  const ms = end - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});



app
    .use(A.routes())
    .use(A.allowedMethods())
    .use(B.routes())
    .use(B.allowedMethods())
    .use(userLogin.routes())
    .use(userLogin.allowedMethods())
    .use(C.routes())
    .use(C.allowedMethods());

app.listen(3333,()=>{
  console.log('Server running at http://localhost:3333')
});
