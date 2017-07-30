var express = require('express')
var app = express()
app.use(express.static('cam'))
var axios=require('axios')
var crypto = require('crypto')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var koneksi=require('./koneksi')
var stemming=require("./stemming")
app.get('/goal', function (req, res) {
  res.sendFile(__dirname+'/html/penasaran.html')
})

// app.post("/webhook",jsonParser,function(req,res){
//   console.log(JSON.stringify(req.body))
//   res.status(200).send("berhasil");
// })
app.get('/webhook', function (req, res) {
	if (req.query['hub.verify_token'] === 'panda') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})
app.get('/', function (req, res) {
  res.sendFile(__dirname+"/cam/pages/blank.html")
  // res.sendFile(__dirname+"/cam/pages/index.html")
})
//simpan database
app.post("/simpan",jsonParser,function(req,res){
  if(req.body.pertanyaan!=null&&req.body.jawaban!=null){
  koneksi.simpan("ecommerce2",{pertanyaan:req.body.pertanyaan,jawaban:req.body.jawaban},function(data){
    koneksi.cari("ecommerce2",{},function(data){
   res.status(200).send(data)       
    })
  })  
  }
  
   
})
//delete pertanyaan ecommerce
app.delete("/delete",function(req,res){
  koneksi.hapus("ecommerce2",req.query.id,function(){
    koneksi.cari("ecommerce2",{},function(data){
   res.status(200).send(data)       
    })
  })
  })
  app.delete("/deletekata",function(req,res){
  koneksi.hapus("kata",req.query.id,function(){
    koneksi.cari("kata",{},function(data){
   res.status(200).send(data)       
    })
  })
  })
  
  app.post("/edit",jsonParser,function(req,res){
    koneksi.update("ecommerce2",req.body.id,req.body.berubah,function(){
      koneksi.cari("ecommerce2",{},function(data){
      res.status(200).send(data)  
      })
      
    })
  })
  var pembetulan=require("./pembetulan")
  app.get("/lavenshtein",function(req,res){
    pembetulan.lavenshtein(JSON.parse(req.query.kata),function(data){
      res.send(data)
    })
  })
  app.get("/stemming",function(req,res){
      pembetulan.stem(JSON.parse(req.query.stemming),function(data){
        
        res.send(data)
    })
  })
  app.get("/kata",function(req,res){
    koneksi.cari("kata3",{},function(data){
      res.send(data)
    })
  })
  app.get("/tf",function(req,res){
    koneksi.cari("tf2",{},function(data){
      res.send(data)
    })
  })
  app.get("/normalisasi",function(req,res){
    koneksi.cari("normalisasi3",{},function(data){
      res.send(data)
    })
  })
  app.get("/idf",function(req,res){
    koneksi.cari("idf5baru",{},function(data){
      res.send(data)
    })
  })
  app.get("/idfclient",function(req,res){
    koneksi.cari("idf5baru",{},function(data){
      res.send(data)
    })
  })
app.get('/skripsi', function (req, res) {
  res.sendFile(__dirname+'/html/panda.html')
})
//mendapatkan pertanyaan ecommerce
app.get('/ecommerce',function(req,res){
  koneksi.cari('ecommerce2',{},function(data){
    res.send(data)
  })
})



app.listen(process.env.PORT,process.env.IP, function () {
  console.log('Example app listening on port '+process.env.PORT)
})
