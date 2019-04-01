const redis_pool = require('redis-connection-pool');

const host = "192.168.199.184";
const pass = "123456";
const port = 6379;
const db = 0;

const redisPool = redis_pool('myRedisPool', {
    host: host,
    port: port,
    max_clients: 10, //
    perform_checks: false, // checks for needed push/pop functionality
    database: db,
    options: {
      auth_pass: pass
    }
});


function get(key){
	return new Promise(function(resolve,reject){
		try
		{
			redisPool.get(key, function(err, res){
				if(err)
				{
					reject();
				}
				else
				{
					resolve(res);
				}
			});
		}
		catch(err)
		{
			console.log('err:',err);
			reject();
		}
	});
}

function set(key, value, exprires=1800){
	return new Promise(function(resolve,reject){
		try
		{
			redisPool.set(key, value, function(err, res){
				redisPool.expire(key, exprires);
				if(err)
				{
					reject();
				}
				else
				{
					resolve(res);
				}
			});
		}
		catch(err)
		{
			console.log('err:',err);
			reject();
		}
	});
}

function del(key){
	return new Promise(function(resolve,reject){
		try
		{
			redisPool.del(key, function(err, res){
				if(err)
				{
					reject();
				}
				else
				{
					resolve(res);
				}
			});
		}
		catch(err)
		{
			console.log('err:',err);
			reject();
		}
	});
}


exports.get = get;
exports.set = set;
exports.del = del;
