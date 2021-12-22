var db = require('./sqldb/index');
const Sequelize=require('sequelize')
const Op=Sequelize.Op

module.exports=function(nameStr){
    if (nameStr){
        return db["PorFIR"].findAll({
            limit:100,
            where:{
                nome:{
                    [Op.like]: `%${nameStr}%`
                }
            }
        })
    }
}