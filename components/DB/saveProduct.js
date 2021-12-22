var db = require('./sqldb/index');
const Sequelize=require('sequelize')
const Op=Sequelize.Op

module.exports=function(data){
    if (data){
        return db["Product"].create({
            code:data.code,
            brand:data.brand,
            name:data.name,
            categorias:data.categorias,
            "categoria_principal":data.categoria_principal,
            "product_preview":data.product_preview
        })
    }
}