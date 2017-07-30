var koneksi=require('./koneksi')
// koneksi.cari("ecommerce2",{},function(kata){
// kata.forEach(function(lakim){
//     lakim.pertanyaan.toLowerCase().split(/\W+/).filter(function(token){
//   return token != ""
// }).forEach(function(data){
//     koneksi.cari("kata",{kata:data},function(lambda){
//         // if(data.length!=0){
//     // koneksi.simpan("kata",{kata:data},function(){
//     //     console.log("berhasil")
//     // })   
//     if(lambda.length==0){
//     koneksi.simpan("kata",{kata:data},function(){console.log(data)
        
//     })
//     }
//         // }
//     })
//     // console.log(data)
// })
// })

// // console.log(data)

 
// })
// koneksi.cari("kata",{},function(data){
//     data.forEach(function(lakim){
// //   console.log(lakim.kata)    
// koneksi.cari("kata",{kata:lakim.kata},function(panda){
//      if(panda.length!=1){
//         //  console.log(panda+panda.length)
//     for(var i=0;i<panda.length-1;i++){
//         koneksi.hapus("kata",panda[i]._id,function(){
//             console.log(panda[i].kata)
//         })
//     }
//      }
//     })            
        
        
//     })
// })
// // koneksi.hapus("kata","5966b0327fb4dcbf8c25f663",function(){
// //     console.log("haha")
// // })

// // koneksi.hapus("kata","5966af80d8d319be7b145f2e",function(){
// //     console.log("oyi")
// // })
// var panda=new Promise(function(resolve,reject){
// koneksi.cari("kata",{},function(data){
//     console.log(data[0].kata)
// idf(/.*saya.*/)
// // data.forEach(function(kata){
// //     kata.kata
// // })
// })
// koneksi.cari("idf2",{},function(data){
//     data.forEach(function(klab){
//         var p={}
//         for(a in klab){
//             if(a!="_id"){
//                 p.term=a
//                 p.idf=klab[a]
//                 koneksi.simpan("idf3",p,function(){
//                     console.log("cam")
//                 })
//             }
        
//     }
//     })
    
// })
// 	var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'kata'
// });
// connection.connect();
// connection.query('SELECT * from dictionary',  function (a,results,b) {
// var panda=results.length
// var sakim=[]
// var gori=[]
// var poki=[]
// koneksi.cari("kata",{},function(data){
//     var pinokio=data.length
//     var i=0
//     var b=0
    
//     results.forEach(function(lams){
//         sakim.push(lams.word)
//         if(sakim.length==panda){
//             data.forEach(function(semi){
//                 i++
//                 gori.push(semi.kata)
//                 if(i==pinokio){
//                     i=0
//                     gori.forEach(function(jaka){
                        
//                     stemming.stem(jaka,function(salting){
//                         if(poki.indexOf(salting)==-1){
//                             koneksi.simpan("kata2",{kata:salting},function(){
//                                 console.log("haha")
//                             })
//                             poki.push(salting)
//                          }
//                         })
//                       })
//                 }
                   
//                 })
//         }
//     })
// })

// connection.end();
// })


var paksi=[]
var stemming=require("./stemming")
var pembetulan=require("./pembetulan")
function idfLog(){
koneksi.cari("idf",{},function(idf){
var i=0
        idf.forEach(function(kaf){
            for(slap in kaf){
                var nam={}
                if(slap!="_id"){
                    var bagi=52/kaf[slap]
                    var asli=1+Math.log(bagi)
                    nam[slap]=asli
                    koneksi.simpan("idf2",nam,function(){
                        console.log(i+1)
                    })
                }
            }
        })
})
}
function idfBelumLog(){
var lam=[]
koneksi.cari("ecommerce2",{},function(data){
 data.forEach(function(hai){
        var y=   hai.pertanyaan.toLowerCase().split(/\W+/).filter(function(token){
  return token != ""
})
lam.push(y)
 })
//  console.log(lam)
koneksi.cari("kata",{},function(data){
    var panda={}
    data.forEach(function(bis){
        lam.forEach(function(arr){
            if(arr.indexOf(bis.kata)!=-1){
                if(panda[bis.kata]==undefined){
                panda[bis.kata]=1    
                }
                else if(panda[bis.kata]!=undefined){
                    panda[bis.kata]+=1
                }
            }
            
        })
    })
    // panda
 for(var i in panda){
     var lakim={}
     lakim[i]=panda[i]
      koneksi.simpan("idf",lakim,function(){
          console.log(lakim)
      })
         
   }
    
})
    
})
}
// idf(/saya/)
// koneksi.simpan("bismillah",{kata:"bismillah"},function(){})
// koneksi.cari("tf2",{},function(data){
//     var g=[]
//     data.forEach(function(kambing){
//         g.push(kambing.id_kb)
//     })
//     koneksi.cari("ecommerce2",{},function(doki){
        
//         doki.forEach(function(kao){
            
//             if(g.indexOf(JSON.stringify(kao._id))==-1){
//                 // console.log(kao)
//                 pembetulan.tf(kao,function(selin){
//                 // console.log(selin)
//                     koneksi.simpan("tf2",selin,function(){})
//                 })
//             }
//         })
//     })
// })


function pengelompokan(pertanyaan){
var tf={}
       pertanyaan.toLowerCase().split(/\W+/).filter(function(token){
  return token != ""
}).forEach(function(lap){
    if(tf[lap]==undefined){
   tf[lap]=1

    }else if(tf[lap]!=undefined){
   tf[lap]+=1
    }
})
return tf
}
// })

// panda.then(function(data){
//     console.log(data)
// })
