var express = require('express');
var router = express.Router();

var getProductByCode=require('../components/DB/./getProductByCode')
var getProductByName=require('../components/DB/./getProductByName')
var getProductByNamePorFIR=require('../components/DB/./getProductByNamePorFIR')
var saveProduct=require('../components/DB/./saveProduct')

let scraper=require('../components/./scapers')
const {request} = require("express");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Add product' });
});

router.get('/camera', function(req, res, next) {
  res.render('camera', { title: 'Camera' });
});

router.get("/db", (req,res)=>{
  getProductByCode().then(data=>{
    res.render("products",{data})
  }).catch(err=>{
    res.json(err)
  })

})

router.post("/db/product", (req,res)=>{
  let data=req.body
  saveProduct(data).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })

})
router.post("/db/associate/nutrientData", (req,res)=>{
  let data=req.body
  saveProduct(data).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })

})

//TODO
router.post("/db/product/update", (req,res)=>{
  let data=req.body
  updateProduct(data).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })

})

router.get("/db/code/:code", (req,res)=>{
  let code=req.params.code
  getProductByCode(code).then(data=>{
    res.render("products",{data})
  }).catch(err=>{
    res.json(err)
  })

})

router.get("/db/name", (req,res)=>{
  let searchStr=req.query.searchStr
  getProductByName(searchStr).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })

})
router.get("/db/porFIR/name", (req,res)=>{
  let searchStr=req.query.searchStr
  getProductByNamePorFIR(searchStr).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })

})

router.get("/scraper/auchan",(req,res)=>{
  res.render("auchan")
})

router.post("/scraper/auchan",(req,res)=>{
  let url=req.body.url
  scraper.auchan(url).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })
})

router.get("/d3",(req,res)=>{
  res.render("d3")
})

module.exports = router;
