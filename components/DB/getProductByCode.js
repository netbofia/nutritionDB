var db = require('./sqldb/index');
const Sequelize=require('sequelize')
const Op=Sequelize.Op

module.exports=function(code){
    if (code){
        return db["Product"].findAll({
            limit:100,
            where:{
                code
            }
        })
    }else{
        return db["Product"].findAll({
            limit:100
        })
    }

}