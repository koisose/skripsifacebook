var express = require('express')
var app = express()
app.use(express.static('cam'))
var axios=require('axios')
var crypto = require('crypto')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var koneksi=require('./koneksi')
app.get('/goal', function (req, res) {
  res.sendFile(__dirname+'/html/penasaran.html')
})

app.post("/webhook",jsonParser,function(req,res){
  console.log(JSON.stringify(req.body))
  res.status(200).send("panda");
})
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "berhasil") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
app.get('/', function (req, res) {
  res.sendFile(__dirname+"/cam/pages/blank.html")
  // res.sendFile(__dirname+"/cam/pages/index.html")
})


app.get('/skripsi', function (req, res) {
  res.sendFile(__dirname+'/html/panda.html')
})
//mendapatkan pertanyaan ecommerce
app.get('/ecommerce',function(req,res){
  koneksi.cari('pertanyaanecommerce',{},function(data){
    res.send(data)
  })
})



app.listen(process.env.PORT,process.env.IP, function () {
  console.log('Example app listening on port '+process.env.PORT)
})
