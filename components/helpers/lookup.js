let request=require('request')


module.exports = function(url,options){
    return new Promise((res,rej)=>{
        request(url,options, function (error, response, body) {
            if(error) rej(error)
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res(body)
        })
    })
}