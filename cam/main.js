var app = angular.module("main", ["ngRoute","ngMaterial","angularUtils.directives.dirPagination","ui.bootstrap"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "pages/index.html",
  controller:"tabelKB"
    
  })
  .when("/database", {
    templateUrl : "pages/database.html",
  controller:"databasekata"
    
  })

});

app.controller("tabelKB",function($scope,$http,Data){
$scope.clear=function(){
  $scope.parser=""
  $scope.token=""
}
  $scope.currentPage=1;
  $scope.pageSize=5;
  $scope.knowledge=[]
 var dropknowledge={}

  $scope.isLoading=false
  $http.get('/ecommerce').then(function(data){
    var panda=data.data.reverse()
    $scope.knowledge=panda
    $scope.knowledge.forEach(function(dalbo){
  dropknowledge[JSON.stringify(dalbo._id)]={pertanyaan:dalbo.pertanyaan,jawaban:dalbo.jawaban}
})
  })
  //tambah
  $scope.tambah=function(pertanyaan,jawaban,ev){
   $("#cam").modal("hide") 
  $scope.isLoading=true  
   $http.post('/simpan',{pertanyaan:pertanyaan,jawaban:jawaban}).then(function(data){
     var panda=data.data.reverse()
    $scope.knowledge=panda
  $scope.isLoading=false
   $scope.pertanyaan=""
   $scope.jawaban=""
     })
  }

//tambah
  //delete
  $scope.delete=function(id,ev){
    if(confirm("apakah anda yakin mau menghapus?")){
  $scope.isLoading=true
        $http.delete("/delete",{params:{id:id}}).then(function(data){
        var panda=data.data.reverse()
    $scope.knowledge=panda
    $scope.isLoading=false
      })
    }
  }
  //delete
  //edit
  $scope.edit=function(id,pertanyaan,jawaban){
    if(confirm("apakah anda yakin mau mengedit?")){
  $("#edit").modal("hide")
  $scope.isLoading=true
        $http.post("/edit",{id:id,berubah:{pertanyaan:pertanyaan,jawaban:jawaban}}).then(function(data){
        var panda=data.data.reverse()
    $scope.knowledge=panda
    $scope.isLoading=false
    $scope.pertanyaan1=""
    $scope.jawaban1=""
    $scope.id=""

      })
    }
  }
  //editModal
  $scope.editModal=function(id,pertanyaan,jawaban){
    $scope.pertanyaan1=pertanyaan
    $scope.jawaban1=jawaban
$scope.id=id
  }
  //parser
  $scope.lexicon={lavenshtein:'',stem:''}
$scope.token=""
var katakata=[]
var normalisasi=[]
var idfhaha={}
$http.get("/kata").then(function(kata){
  kata.data.forEach(function(pam){
    katakata.push(pam.kata)
  })
})
$http.get("/normalisasi").then(function(tf){
  tf.data.forEach(function(pam){
    
    normalisasi.push(pam)    
      })
})
$http.get("/idfclient").then(function(idf){
  idf.data.forEach(function(pam){
    // for(a in pam){
    //   if(a!="_id"&&a!="rumus"){
    idfhaha[pam.kata]=pam.idf    
    //   }
    // }
   
  })
  
})
//tokenizer
$scope.tokenizer=function(teks){
  if(teks!=null){
$scope.token=teks.toLowerCase().split(/\W+/).filter(function(token){
  return token != ""
})
var jo=$scope.token

$http.get("/lavenshtein",{params:{kata:JSON.stringify(jo)}}).then(function(data){
$scope.lexicon.lavenshtein=data.data
$http.get("/stemming",{params:{stemming:JSON.stringify(data.data)}}).then(function(stem){
  $scope.lexicon.stem=stem.data
  tfidfyeah(stem.data)
})
})
function tfidfyeah(sap){
var idfsek={}
var idfarray=[]
sap.forEach(function(clap){
  if(clap.length!=0){
    for(var i=0;i<normalisasi.length;i++){
    if(normalisasi[i][clap]!=undefined){
      var cebum={}
        var kali=normalisasi[i][clap]*idfhaha[clap]
        cebum._id=normalisasi[i].id_kb
        cebum[clap]=kali
        if(idfarray.length<normalisasi.length){
        idfarray.push(cebum)
        }else if(idfarray.length>=normalisasi.length){
          idfarray[i][clap]=kali
        }
        // idfsek[clap].push({_id:skip._id,tfidf:kali})
      }else{
        var cakil={}
        cakil._id=normalisasi[i].id_kb
        cakil[clap]=0
        if(idfarray.length<normalisasi.length){
        idfarray.push(cakil)
        }else if(idfarray.length>=normalisasi.length){
          idfarray[i][clap]=0
        }
        // idfsek[clap].push({_id:skip._id,tfidf:0})
      }  
    }
    
  }
})

// console.log(idfarray)
  Data.setTfidf(idfarray)
  var tfidf2={}
sap.forEach(function(ket){
    if(tfidf2[ket]==undefined){
    tfidf2[ket]=1
  }else if(tfidf2[ket]!=undefined){
    tfidf2[ket]+=1
  }
})
var carti=[]
sap.forEach(function(cash){
  var tfidf=(tfidf2[cash]/sap.length)*idfhaha[cash]
// tfidf2[cash]=(tfidf2[cash]/sap.length)*idfhaha[cash]
  carti.push({kata:cash,tfidf:tfidf})
})
Data.setTfidf2(carti)
// console.log(carti)
var dhahar=0
carti.forEach(function(data){
  dhahar+=Math.pow(data.tfidf,2)
})
// console.log(Math.sqrt(dhahar))
var selesai=[]
 idfarray.forEach(function(data){
   var a=0
   var c=0
   carti.forEach(function(pakai){
     c+=Math.pow(data[pakai.kata],2)
     a+=pakai.tfidf*data[pakai.kata]
   })
   var kloki=Math.sqrt(dhahar)*Math.sqrt(c)
    selesai.push({id:data._id,cosine:a/kloki})
 })
var selesai2=selesai.filter(function(a){
  return isNaN(a.cosine)==false
})

selesai2.forEach(function(data){
  data.pertanyaan=dropknowledge[data.id].pertanyaan
  data.jawaban=dropknowledge[data.id].jawaban
})
var selesai3=selesai2.sort(function(a,b){
  return b.cosine-a.cosine
})
console.log(selesai3)
  Data.setCosine(selesai3)
  
}
  
}
}  


//tokenizer
})
app.filter('eminem',function(){
  return function(item,input){
    if(input==null || input==""){
      return item
    }
    var kem=[]
    item.forEach(function(cam){
      if(cam.hasOwnProperty(input)){
        kem.push(cam)
      }else if(JSON.stringify(cam._id)==JSON.stringify(input)){
        kem.push(cam)
      }
    })
    return kem
  }
})
app.factory('Data', function () {

    var data = {
        Tfidf: '',
        kata:'',
        tfidf2:'',
        cosine:''
    };

    return {
      getKata: function () {
            return data.kata;
        },
        setKata: function (a) {
            return data.kata=a;
        },
        getTfidf2: function () {
            return data.tfidf2;
        },
        setTfidf2: function (a) {
            return data.tfidf2=a;
        },
        getTfidf: function () {
            return data.Tfidf;
        },
        setTfidf: function (arr) {
  // console.log(arr)
            data.Tfidf = arr;
        },
        getCosine: function () {
            return data.cosine;
        },
        setCosine: function (arr) {
  // console.log(arr)
            data.cosine = arr;
        }
    };
});
//GENERATOR COSINE SIMILIARITY
app.controller("generator",function($scope,$http, Data){
$scope.curPage = 0;
 $scope.pageSize = 3;
  $scope.knowledge={}
  
  
   $scope.$watch(function () { return Data.getCosine(); }, function (newValue, oldValue) {
        $scope.knowledge = newValue
      });
      
    
    
})
//DATABASETFIDF
app.controller("databasetfidf",function($scope,$http, Data){
$scope.curPage = 0;
 $scope.pageSize = 3;
  $scope.knowledge={}
  $scope.kata=""
  
   $scope.$watch(function () { return Data.getTfidf(); }, function (newValue, oldValue) {
        $scope.knowledge = newValue
      });
      $scope.$watch(function () { return Data.getKata(); }, function (newValue, oldValue) {
        $scope.kata = newValue
      });
    
    
})
app.controller("databasetfidfquery",function($scope,$http, Data){

  $scope.tfidf2=""
       $scope.$watch(function () { return Data.getTfidf2(); }, function (newValue, oldValue) {
        $scope.tfidf2 = newValue
        
      });
    
})
//DATABASEKATA
app.controller("databasekata",function($scope,$http){
  $scope.currentPage=1;
  $scope.pageSize=5;
  $scope.knowledge=[]
 
  $scope.isLoading=false
  $http.get('/kata').then(function(data){
    var panda=data.data.reverse()
    $scope.knowledge=panda
  })
    //delete
  $scope.delete=function(id,ev){
    if(confirm("apakah anda yakin mau menghapus?")){
  $scope.isLoading=true
        $http.delete("/deletekata",{params:{id:id}}).then(function(data){
        var panda=data.data.reverse()
    $scope.knowledge=panda
    $scope.isLoading=false
      })
    }
  }
  //delete
  
})
//DATABASETF
app.controller("databasetf",function($scope,$http){
$scope.curPage = 0;
 $scope.pageSize = 3;
  $scope.knowledge=[]
   
  $scope.isLoading=false
  $http.get('/tf').then(function(data){
    var panda=data.data.reverse()
    $scope.knowledge=panda
  })
    
})
//DATABASENORMALISASI
app.controller("databasenormalisasi",function($scope,$http){
$scope.curPage = 0;
 $scope.pageSize = 3;
  $scope.knowledge=[]
   
  $scope.isLoading=false
  $http.get('/normalisasi').then(function(data){
    var panda=data.data.reverse()
    $scope.knowledge=panda
  })
 
    //delete
  // $scope.delete=function(id,ev){
  //   if(confirm("apakah anda yakin mau menghapus?")){
  // $scope.isLoading=true
  //       $http.delete("/deletekata",{params:{id:id}}).then(function(data){
  //       var panda=data.data.reverse()
  //   $scope.knowledge=panda
  //   $scope.isLoading=false
  //     })
  //   }
  // }
  //delete
  
})
//DATABASENORMALISASI
app.controller("databaseidf",function($scope,$http){
$scope.curPage = 0;
 $scope.pageSize = 3;
  $scope.knowledge=[]
   
  $scope.isLoading=false
  $http.get('/idf').then(function(data){
    var panda=data.data.reverse()
    $scope.knowledge=panda
  })
    //delete
  // $scope.delete=function(id,ev){
  //   if(confirm("apakah anda yakin mau menghapus?")){
  // $scope.isLoading=true
  //       $http.delete("/deletekata",{params:{id:id}}).then(function(data){
  //       var panda=data.data.reverse()
  //   $scope.knowledge=panda
  //   $scope.isLoading=false
  //     })
  //   }
  // }
  //delete
  
})

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.component('databasetfidfquery', {
  templateUrl: 'pages/component/databasetfidfquery.html',
  controller: 'databasetfidfquery'
});
app.component('databasetfidf', {
  templateUrl: 'pages/component/databasetfidf.html',
  controller: 'databasetfidf'
});
app.component('parser', {
  templateUrl: 'pages/component/1parser.html',
  controller: 'tabelKB'
});
app.component('lexicon', {
  templateUrl: 'pages/component/2lexicon.html',
  controller: 'tabelKB'
});
app.component('understander', {
  templateUrl: 'pages/component/3understander.html',
  controller: 'tabelKB'
});
app.component('kbase', {
  templateUrl: 'pages/component/4kbase.html',
  controller: 'tabelKB'
});
app.component('generator', {
  templateUrl: 'pages/component/5generator.html',
  controller: 'generator'
});
app.component('databasekata', {
  templateUrl: 'pages/component/databasekata.html',
  controller: 'databasekata'
});
app.component('databasetf', {
  templateUrl: 'pages/component/databasetf.html',
  controller: 'databasetf'
});
app.component('databasenormalisasi', {
  templateUrl: 'pages/component/databasenormalisasi.html',
  controller: 'databasenormalisasi'
});
app.component('databaseidf', {
  templateUrl: 'pages/component/databaseidf.html',
  controller: 'databaseidf'
});
