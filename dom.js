

function saveToLocal(event){
 event.preventDefault()
 let uname=document.getElementById('username').value
let uemail=document.getElementById('useremail').value

let userdetails={

    uname,uemail
}
// localStorage.setItem(uemail,JSON.stringify(userdetails))

axios.post('https://crudcrud.com/api/6966bd97409b4e2b9c36414a15fc1f19/appointmentData',userdetails)
.then((res)=>{
    showNewUser(res.data)
    
})
.catch((err)=>{

    console.log(err)
})


}
window.addEventListener("DOMContentLoaded",()=>{
axios.get('https://crudcrud.com/api/6966bd97409b4e2b9c36414a15fc1f19/appointmentData')
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
                                        <button style= 'margin-left: 2px;'onclick=deleteuser('${user.uemail}')>Delete</button></li>`
ulist.innerHTML=ulist.innerHTML+appendli
}

function edituser(name,email){

document.getElementById('username').value=name
document.getElementById('useremail').value=email
deleteuser(email)
}

function deleteuser(emailid){

    
    localStorage.removeItem(emailid)
    removeUserFromView(emailid)
}

function removeUserFromView(email){
    let uList=document.getElementById('userList')
    let delnode=document.getElementById(email)
    uList.removeChild(delnode)
}
