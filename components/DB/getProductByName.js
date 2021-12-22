var db = require('./sqldb/index');
const Sequelize=require('sequelize')
const Op=Sequelize.Op

module.exports=function(nameStr){
    if (nameStr){
        return db["Product"].findAll({
            limit:100,
            where:{
                name:{
                    [Op.like]: `%${nameStr}%`
                }
            }
        })
    }
}