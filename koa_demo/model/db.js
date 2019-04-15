const Sequelize = require("sequelize");

var db = new Sequelize('test1', 'root', '123456', {
    host: '192.168.9.146',
    dialect: 'mysql',
    pool: {
        max: 5,             // 连接池最大连接数量
        min: 0,             // 连接池最小连接数量
        idle: 10000         // 如果一个线程超过10秒钟没有被使用过就释放该线程
      }
});

module.exports = db;