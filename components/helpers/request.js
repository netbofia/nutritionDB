//TODO not necessary anymore

const http= require('http')
const https= require('https')


module.exports=function(host,port,path,data){
    //let port=host.startsWith("https:") ? 443 : 80
    return new Promise((resolve,rej)=>{
        const options = {
            host,
            port,
            path,
            method:"GET"
        };
        const req=options.port==80 ? http.request(options) : https.request(options);
        req.method=options.method
        req.setHeader('User-Agent', "NodeJS -- Application - gassensor-dashboard")
        req.setHeader('Content-Type', 'application/json; charset=UTF-8')
        req.setHeader('Transfer-Encoding', 'chunked')
        //req.write("")//For POST
        req.on('response',(res)=>{
            let result=""
            if(res.statusCode!=200){
                rej(res.statusMessage)
            }
            res.on('end',()=>{
                resolve(result)
            })
            res.on('data',(chunk)=>{
                result+=chunk
            })
        })
        req.on('error',(res)=>{
            console.log("Unable to connect to server")
        })
        req.end();
    })
}
