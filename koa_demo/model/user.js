const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:Sequelize.STRING(8)
        },
        password:{
            type: Sequelize.STRING(16)
        }
    }
);

// User.sync();
async function queryUser(){

    let user = await User.findOne();

    console.log("===user: ", user.username);
}

// queryUser();
module.exports = User;
