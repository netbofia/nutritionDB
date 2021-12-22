const lookup=require('../helpers/./lookup')
const $=require('jquery')
const { JSDOM } = require( "jsdom" );
const fs=require('fs')
module.exports = async function(url){
    let body=await(lookup(url))
    const { window } = new JSDOM( body );
    const $ = require( "jquery" )( window );

    let code
    try {
        code=$('.product-detail').attr('data-ean')
    }catch(e){
        code=""
    }
    let brand=""
    let name=""

    try{
        brand=JSON.parse($('input[name="gtmOnLoad"]').val()).ecommerce.detail.products[0].brand
        name=JSON.parse($('input[name="gtmOnLoad"]').val()).ecommerce.detail.products[0].name
    }catch(err){
        name=$('.product-name').text()
    }
    let categorias=""
    $('.product-breadcrumb  ol.breadcrumb li.breadcrumb-item').each(function(){
        categorias+=$(this).text().trim()+";"
    })
    let categoria_principal=categorias.split(";").splice(-2,1)[0]
    let ingredients
    try{
        $(".product-attributes .content h3").each(function(index){
            if( $(this).text().trim() == "Ingredientes/Composição" ){
                ingredients=$(`.product-attributes .attribute-values.auc-pdp-regular:nth(${index})`).text().trim()
            }

        })

    }catch (e) {
        
    }
    let nutritional_info
    try{
        $(".product-attributes .content h3").each(function(index){
            if( $(this).text().trim() == "Informações Nutricionais" ){
                nutritional_info=$(`.product-attributes .attribute-values.auc-pdp-regular:nth(${index})`).text().trim()
            }

        })

    }catch (e) {

    }

    let description=$(".description .content.auc-pdp-regular").text().trim()
    let product_preview
    try{
        let product_img_src=$('picture img').attr('src')
        product_preview="/images/productos/auchan/"+product_img_src.split("/").pop().split("?")[0]
        let img_blob=await lookup(product_img_src,{encoding: 'binary'})
        fs.writeFile(`${__dirname}/../../public/${product_preview}`,img_blob,"binary", function(err){
            console.log("Saving file failed:"+err)
        })
    }catch(err){
        console.log("Unable to extract picture!")
    }

    return {code,brand,name,categorias,categoria_principal,description,ingredients,nutritional_info,product_preview}

}