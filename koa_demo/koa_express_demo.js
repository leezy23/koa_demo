const express = require('express');
const app = express();

var f1 = (req, res, next)=>{
    // res.send("<h3>请求 => 第一层中间件</h3>")
    console.log("===================================1");
    next();
    console.log("===================================4");
}
var f2 = (req, res, next)=>{
    // res.send("<h3>请求 => 第二层中间件</h3>")
    console.log("===================================2");
    next();
    console.log("===================================5");
}

app.use(f1);
app.use(f2);

app.get('/', function(req, res){
    console.log("===================================3");
    res.send('hello world');
});

app.listen(3000);
