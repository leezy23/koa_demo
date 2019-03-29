// const Koa = require('koa');
// const app = new Koa();
// const indent = (n) => new Array(n).join(' ');
// const mid1 = () => async (ctx, next) => {
//   ctx.body = `<h3>请求 => 第一层中间件</h3>`;
//   console.log("==============================1");
//   await next();
//   ctx.body += `<h3>响应 <= 第一层中间件</h3>`;
//   console.log("==============================2")
// };
// const mid2 = () => async (ctx, next) => {
//   ctx.body += `<h3>${indent(4)}请求 => 第二层中间件</h3>`;
//   console.log("==============================3");
//   await next();
//   ctx.body += `<h3>${indent(4)}响应 <= 第二层中间件</h3>`;
//   console.log("==============================4")
// };
// app.use(mid1());
// app.use(mid2());
// app.use(async (ctx, next) => {
//   console.log("==============================5");
//   ctx.body += `<p style="color: #f60">${indent(12)}=> Koa 核心 处理业务 <=</p>`
// });
// app.listen(3333);
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
