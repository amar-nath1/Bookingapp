

function saveToServer(event){
 event.preventDefault()
 let uname=document.getElementById('username').value
let uemail=document.getElementById('useremail').value

let userdetails={

    uname,uemail
}
// localStorage.setItem(uemail,JSON.stringify(userdetails))
axios.get('https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData').then((res)=>{

if (res.data.length==0){

    axios.post('https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData',userdetails)
.then((res)=>{
    showNewUser(res.data)
    
})
.catch((err)=>{

    console.log(err)
})

}
else{

    let emailexists=false
    let existedobj=null

    for (let i of res.data){
        
        if (i.uemail==userdetails.uemail){

            emailexists=true
            existedobj=i
            break
                        
        }
        
    }

    if (emailexists){
        
        let link='https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData/'+existedobj._id

            axios.put(link,userdetails).then(()=>{
                removeUserFromView(userdetails.uemail)
                showNewUser(userdetails)})
                
                
            .catch((err)=>{console.log(err)})
    }

    else {

        axios.post('https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData',userdetails)
.then((res)=>{
showNewUser(res.data)

})
.catch((err)=>{

console.log(err)
})

    }

    
}

})



}
window.addEventListener("DOMContentLoaded",()=>{
axios.get('https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData')
.then((res)=>{

    for (let i of res.data){
        showNewUser(i)
    }
})
.catch((err)=>{

    console.log(err)
})

})

function showNewUser(user){
let ulist=document.getElementById('userList')
let appendli=`<li id=${user.uemail}>${user.uname} - ${user.uemail}<button style= 'margin-left: 30px;'onclick=edituser('${user.uname}','${user.uemail}')>Edit</button>
                                        <button style= 'margin-left: 2px;'onclick=deleteuser('${user._id}','${user.uemail}')>Delete</button></li>`
ulist.innerHTML=ulist.innerHTML+appendli
}

function edituser(name,email){

document.getElementById('username').value=name
document.getElementById('useremail').value=email
deleteuser(email)
}

function deleteuser(id,email){

    let link=  'https://crudcrud.com/api/4a6bfdc7526c4c529fea166f1ee93262/appointmentData/'+id 
    axios.delete(link).then(()=>{

        removeUserFromView(email)

    })
    .catch((err)=>{console.log(err)})

    
}

function removeUserFromView(email){
    let uList=document.getElementById('userList')
    let delnode=document.getElementById(email)
    uList.removeChild(delnode)
}
