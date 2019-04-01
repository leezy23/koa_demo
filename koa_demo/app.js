const Koa = require('koa');
const A = require('./routes/A');
const B = require('./routes/B');
const C = require('./routes/C');
const app = new Koa();


// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("==============================1");
  await next();
  console.log("==============================2");
  const end = Date.now();
  const ms = end - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("==============================3");
  await next();
  console.log("==============================4");
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});



app
    .use(A.routes())
    .use(A.allowedMethods())
    .use(B.routes())
    .use(B.allowedMethods())
    .use(C.routes())
    .use(C.allowedMethods());

app.listen(3333,()=>{
  console.log('Server running at http://localhost:3333')
});
