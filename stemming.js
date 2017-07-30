
function cekKamus(kata,selesai){ 

	var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'kata'
});
connection.connect();

connection.query('SELECT * from dictionary where word="'+kata+'"',  function (a,results,b) {
	if(results!=undefined){
if(results.length==1){
	selesai(true)
}else{
	selesai(false)
}		
	}else if(results==undefined){

		selesai(false)
	}

connection.end();
	
})
    
	
}

//fungsi untuk menghapus suffix seperti -ku, -mu, -kah, dsb
function Del_Inflection_Suffixes(kata,selesai){ 
	var kataAsal = kata;
	
	if(kata.match(/([km]u|nya|[kl]ah|pun)$/i)){ // Cek Inflection Suffixes
		var __kata = kata.replace(/([km]u|nya|[kl]ah|pun)$/i,'');

		selesai(__kata);
	}else{
	selesai(kataAsal);
	}
}
// Cek Prefix Disallowed Sufixes (Kombinasi Awalan dan Akhiran yang tidak diizinkan)
function Cek_Prefix_Disallowed_Sufixes(kata){

	if(kata.match(/^(be)[a-zA-Z]+(i)/)){ // be- dan -i
		return true;
	}

	if(kata.match(/^(se)[a-zA-Z]+(i|kan)/)){ // se- dan -i,-kan
		return true;
	}
	
	if(kata.match(/^(di)[a-zA-Z]+(an)/)){ // di- dan -an
		return true;
	}
	
	if(kata.match(/^(me)[a-zA-Z]+(an)/)){ // me- dan -an
		return true;
	}
	
	if(kata.match(/^(ke)[a-zA-Z]+(i|kan)/)){ // ke- dan -i,-kan
		return true;
	}
	return false;
}

// Hapus Derivation Suffixes ("-i", "-an" atau "-kan")
function Del_Derivation_Suffixes(kata,selesai){
	var kataAsal = kata;
	var sam=kata
	if(kata.match(/(i|an)$/i)){ // Cek Suffixes
	
	var __kata = sam.replace(/(i|an)$/i,'');
		cekKamus(__kata,function(bool){
			if(bool){
				
				selesai(__kata)	
			}else if(kata.match(/(kan)$/i)){
			__kata=sam.replace(/(kan)$/i,'')
			cekKamus(__kata,function(kan){

					if(kan){
						
					selesai(__kata)
					}else{
						
					selesai(kataAsal)
					}
				})
			}else{
				
		selesai(kataAsal)
				}
		})
	}else{
		
			selesai(kataAsal)
	}
	
}
const argv = require('yargs').argv
if(argv.stem){
	stemming(argv.stem,function(data){
		console.log(data)
	})
}

// Hapus Derivation Prefix ("di-", "ke-", "se-", "te-", "be-", "me-", atau "pe-")
function Del_Derivation_Prefix(kata,selesai){
	var kataAsal = kata;
var __kata,__kata__=""
	/* —— Tentukan Tipe Awalan ————*/
if(kata.match(/^(di|[ks]e)/)){ // Jika di-,ke-,se-
    __kata = kata.replace(/^(di|[ks]e)/,'');
    
    cekKamus(__kata,function(data){
	 if(data){
		selesai(__kata)
	 }else{
	 	
	Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data
			
     cekKamus(__kata__,function(data){
	    if(data){
		  selesai(__kata__)
	    }else if(kata.match(/^(diper)/)){ //diper-
		
			__kata = kata.replace(/^(diper)/,'');
			 Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data	
			cekKamus(__kata__,function(data){
				if(data){
				selesai(__kata__)	
				}else{
					selesai(kataAsal)
				}
			})
			 	
			 });
		
			
			
		}else if(kata.match(/^(ke[bt]er)/)){  //keber- dan keter-
		     __kata = kata.replace(/^(ke[bt]er)/,'');
			  Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data	
		cekKamus(__kata__,function(data){
				if(data){
					selesai(__kata__)
				}else{
					selesai(kataAsal)
				}
			})
			});
		
			
			
		} else{
			selesai(kata.replace(/^(di|[ks]e)/,''))
		}
      })
    }) 	
	 }
    })		
		
	}else if(kata.match(/^([bt]e)/)){ //Jika awalannya adalah "te-","ter-", "be-","ber-"
		
		 __kata = kata.replace(/^([bt]e)/,'');
		
		cekKamus(__kata,function(data){
			if(data){
				selesai(__kata)
			}else{
		__kata = kata.replace(/^([bt]e[lr])/,'');	
		
		cekKamus(__kata,function(data){
			if(data){
				selesai(__kata)
			}else{
			Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data
		cekKamus(__kata__,function(data){
			if(data){
				selesai(__kata__)
			}else{
				selesai(kataAsal)
			}
		})
		})}	
			
		})}
		});
		
		}else if(kata.match(/^([mp]e)/)){
		__kata = kata.replace(/^([mp]e)/,'');
		
		cekKamus(__kata,function(data){
			if(data){
			selesai(__kata)
			}else
			Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data
		cekKamus(__kata__,function(data){
		if(data){
			selesai(__kata__)
		}else if(kata.match(/^(memper)/)){
			__kata = kata.replace(/^(memper)/,'');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__=data
		cekKamus(__kata__,function(data){
				if(data){
					selesai(__kata__)
				}else{
					selesai(kataAsal)
				}
			})
			
		})}
			})
		
			
			
		}else if(kata.match(/^([mp]eng)/)){
			__kata = kata.replace(/^([mp]eng)/,'');
		cekKamus(__kata,function(data1){
			if(data1){
				selesai(__kata)
			}else{
			Del_Derivation_Suffixes(__kata,function(data2){
			__kata__=data2
			cekKamus(__kata__,function(data3){
				if(data3){
					selesai(__kata__)
				}else{
			__kata = kata.replace(/^([mp]eng)/,'k');
			cekKamus(__kata,function(data4){
				if(data4){
				selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data5){
			__kata__ =data5
			cekKamus(__kata__,function(data6){
				if(data6){
					selesai(__kata__)
				}else{
					__kata = kata.replace(/^([mp]enge)/,'');//menge- dan penge-
			cekKamus(__kata,function(data4){
				if(data4){
				selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data5){
			__kata__ =data5
			cekKamus(__kata__,function(data6){
				if(data6){
					selesai(__kata__)
				}else{
					selesai(kataAsal)
				}
			})
			 	
			 });
					
				}
			})
				}
			})
			 	
			 });
					
				}
			})
					
				}
				
			})
			 	
			 });}
		})
			 
		}else if(kata.match(/^([mp]eny)/)){
			__kata = kata.replace(/^([mp]eny)/,'s');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__ =data	
			cekKamus(__kata__,function(data){
			if(data){
				selesai(__kata__)
			}else{
				selesai(kataAsal)
			}
		})
			});}
			})
			
			 
		
			
		}else if(kata.match(/^([mp]e[lr])/)){
			__kata = kata.replace(/^([mp]e[lr])/,'');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__ =data	
			cekKamus(__kata__,function(data){
			if(data){
				selesai(__kata__)
			}else{
				selesai(kataAsal)
			}
			})
			 	
			 })}
			})
			
		}else if(kata.match(/^([mp]en)/)){
			__kata = kata.replace(/^([mp]en)/,'t');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__ =data	
			cekKamus(__kata__,function(data){
				if(data){
				selesai(__kata__)	
				}else{
				__kata = kata.replace(/^([mp]en)/,'');
			cekKamus(__kata,function(data){
				if(data){
				selesai(__kata)
				}else {
					
			Del_Derivation_Suffixes(__kata,function(data){
			__kata__ = data	
			cekKamus(__kata__,function(data){
				if(data){
					selesai(__kata__)
				}else{
					selesai(kataAsal)
				}
			})
				
			});}
			})}
			})
			 	
			 });}
				
			})
			
		
			
		}else if(kata.match(/^([mp]em)/)){
			__kata = kata.replace(/^([mp]em)/,'');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__ = data	
			cekKamus(__kata__,function(data){
				if(data){
					selesai(__kata__)
				}else{
			__kata = kata.replace(/^([mp]em)/,'p');
			cekKamus(__kata,function(data){
				if(data){
					selesai(__kata)
				}else{
				Del_Derivation_Suffixes(__kata,function(data){
			__kata__ = data	
			cekKamus(__kata__,function(data){
				if(data){
					selesai(__kata__)
				}else{
					selesai(kataAsal)
				}
			})
			});}
			})}
			})
			});}
			})
			}	
		
		})
		 	
		 });
		})
		
		 
	}else{
	selesai(kataAsal)
	}
}

//fungsi pencarian akar kata
function stemming(kata,selesai){ 

	 var kataAsal = kata;
	 var sam=kata
var cekKata =""
	 cekKamus(kata,function(data6){
	 cekKata=data6
	if(cekKata == true){ // Cek Kamus
		selesai(kata); // Jika Ada maka kata tersebut adalah kata dasar
	}else { //jika tidak ada dalam kamus maka dilakukan stemming
		
		Del_Inflection_Suffixes(sam,function(data){
		sam = data	
		
		cekKamus(sam,function(data1){
		if(data1){
			selesai(sam)
			}else{
		
		Del_Derivation_Suffixes(sam,function(data2){
		sam = data2
		cekKamus(sam,function(data3){
		
			if(data3){
				selesai(sam)
			}else{
		
			Del_Derivation_Prefix(sam,function(data4){
			
		sam = data4
			
		cekKamus(sam,function(data5){
			if(data5){
		selesai(sam)
			}else{
				selesai(kataAsal)
			}
	    })
			
		});}
		})
			
		});}
		})
			
		});
	
		
	}
	 });
		
}
module.exports={
	stem:stemming
}

