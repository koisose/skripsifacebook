var stemming=require("./stemming")
var koneksi=require("./koneksi")
var distances=require('./damerau-levenshtein')

function lavenshtein(kataclient,selesai){
    var katabaharu={}
    koneksi.cari("kata3",{},function(laven){
     kataclient.forEach(function(kacli){
         katabaharu[kacli]=[]
         laven.forEach(function(lav){
          if(distances.distance(kacli,lav.kata)<4){
           katabaharu[kacli].push({kata:lav.kata,mirip:distances.distance(kacli,lav.kata)})
              
          }
        })
      })
    var katabaru={}
      for(a in katabaharu){
          katabaharu[a].sort(function(a,b){
              return a.mirip-b.mirip
          }).forEach(function(jambo){
              if(jambo.mirip==0){
                  katabaru[a]=jambo.kata
              }
              else if(jambo.mirip==1 && katabaru[a]==undefined){
                  katabaru[a]=jambo.kata
              }
              else if(jambo.mirip>1 && katabaru[a]==undefined){
                  katabaru[a]=jambo.kata
              }
          })
      }
      selesai(katabaru)
    })
    
}
function stem(katabaru,selesai){
    
      var poldi=[]
      var jolo=[]
      var z=0
     for(a in katabaru){
        poldi.push(katabaru[a])
      }
      poldi.forEach(function(daki){
          
            stemming.stem(daki,function(dalbo){
            z++
               jolo.push(dalbo)
               if(z==poldi.length){
                   selesai(jolo)
                   
               }
            })
      })
}

function tf(pelikan,selesai){
  
    var j=0
     var pokis={}
        pokis.id_kb=JSON.stringify(pelikan._id)
     regex(pelikan.pertanyaan).forEach(function(paksu){
    
            stemming.stem(paksu,function(lapis){
                j++
    
              if(pokis[lapis]==undefined){
                  pokis[lapis]=1
                   if(regex(pelikan.pertanyaan).length-1==j){
           j=0
                  selesai(pokis)
                  
              }
              }  else if(pokis[lapis]!=undefined){
                  pokis[lapis]++
                   if(regex(pelikan.pertanyaan).length-1==j){
           j=0
                  selesai(pokis)
                  
              }
              }
            })
        })
}
function regex (str) {
    return str.toLowerCase().replace(/\d+/g,"").split(/\W+/).filter(function(token){
  return token != ""
})
}
function normalisasi(pertanyaan){
    var p=[]
   for(var i in pertanyaan){
       if(i!="_id"&&i!="id_kb"){
           p.push(i)
         }
   }
   //console.log(p);
   var y={}
    for(var i in pertanyaan){
       if(i!="_id"&&i!="id_kb"){
       
  y[i]=pertanyaan[i]/p.length
         }else if(i=="id_kb"){
  y[i]=pertanyaan[i]           
         }
         else if(i=="_id"){
  y["id_tf"]=JSON.stringify(pertanyaan[i])           
         }
   }
   return y 
}

function normalisasiTF(){
    koneksi.cari("tf2",{},function(blas){
    blas.forEach(function(mendit){
    koneksi.simpan("normalisasi3",normalisasi(mendit),function(){
        console.log("mendit")
    })    
    })
    
})
}

function idf(){
    koneksi.cari("tf2",{},function(matty){
koneksi.cari("kata2",{},function(cat){
    var loki={}
    // console.log(cat.length)
cat.forEach(function(koyi){
    //   z++
      matty.forEach(function(koli){
        if(koli[koyi.kata]!=undefined&&loki[koyi.kata]==undefined){
            loki[koyi.kata]=1
        }else if(koli[koyi.kata]!=undefined&&loki[koyi.kata]!=undefined){
            loki[koyi.kata]++
        }
    })

})
var lavar=[]
for(a in loki){
    var panda=1+Math.log10(matty.length/loki[a])
    var katas="1+log("+matty.length+"/"+loki[a]+")"
lavar.push({kata:a,idf:panda,rumus:katas})
}

lavar.forEach(function(loko){
    koneksi.simpan("idf5baru",loko,function(){})
})

})    
})
}
module.exports={
    lavenshtein:lavenshtein,
    stem:stem,
    tf:tf,
    regex:regex,
    normalisasi:normalisasi
}