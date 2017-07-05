var instagram_access_token="367385328.7b79756.2c1f67298d824d978621ada72bd2530f"
var user_access_token="";
var ider_token="EAAYHe5oKFiMBAEVC3sYxDwjzbwOAgEDpi4YhKGqlHVP3MTCuTZCjPRjXq4BQfbkb22LhoX80zRXffRYCZCafAM2QZCLMnZAoIhVO4sXyDJpveKOKRI4nbQZByZB23qxgYCaEURwrgAKvUbNkxiOsRKnO6kBleBJQxvKAbKK3kdnwZDZD"
var page_access_token="EAAYHe5oKFiMBAJ9UnNhfccGWqD7ZBL6ZB4Khj0ZBrJUZANlZCzg9FjN6ZAgYwAVkAZB8yCZAS8e0As6FIk3DdJb7X3ZAVaZAhsfSZBDOpzAFs3hLVkE43lqUsRGMJRoIVg00pbsjGZBSEQCiUh7ciCmRy2KyifK2bL8gtQIZD";
var axios=require('axios');
var URL="https://graph.facebook.com/";
function update(){
    
}
function get(url,data,berhasil){
axios.get(URL+url,{params:data}).then(function(data){
    berhasil(data.data)
})
.catch()        
}
function post(url,data,berhasil){

axios.post(URL+url,data).then(data=>{
    berhasil(data.data)
})
.catch(err=>{
    console.log(err)
})    
}
function hapus(post,berhasil){
axios.delete(URL+post,{params:{
       access_token:ider_token,
}}).then(function(data){
    berhasil(data.data)
})
.catch(function(data){
    console.log(data)
})    
}
function dapatFeed(){
    get('1475982862440295/feed',null,function(data){
        console.log(data)
    })
}
function comment(id,message){
post(id+'/comments',{
    access_token:page_access_token,
    message:message
},function(data){
  console.log(data)
})    
}
function lihatComment(id){
    get(id+'/comments',{access_token:page_access_token},function(data){
        console.log(data.data[0].from)
    })
}

// lihatComment('1475982862440295_1487712874600627')
// post('1475982862440295/feed',{
//     access_token:ider_token,
//     message:"haha2"
// },function(data){
//   console.log(data)
// })