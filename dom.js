

function saveToLocal(event){
 event.preventDefault()
 let uname=document.getElementById('username').value
let uemail=document.getElementById('useremail').value

let userdetails={

    uname,uemail
}
localStorage.setItem(uemail,JSON.stringify(userdetails))

showNewUser(userdetails)
}


for (let i=0;i<localStorage.length;i++){

    udet=JSON.parse(localStorage.getItem(localStorage.key(i)))
    showNewUser(udet)
}

function showNewUser(user){
let ulist=document.getElementById('userList')
let appendli=`<li id=${user.uemail}>${user.uname}<button style= 'margin-left: 30px;'onclick=edituser('${user.uname}','${user.uemail}')>Edit</button>
                                        <button style= 'margin-left: 2px;'onclick=deleteuser('${user.uemail}')>Delete</button></li>`
ulist.innerHTML=ulist.innerHTML+appendli
}

function edituser(name,email){

document.getElementById('username').value=name
document.getElementById('useremail').value=email
deleteuser(email)
}

function deleteuser(emailid){

    console.log(emailid)
    localStorage.removeItem(emailid)
    removeUserFromView(emailid)
}

function removeUserFromView(email){
    let uList=document.getElementById('userList')
    let delnode=document.getElementById(email)
    uList.removeChild(delnode)
}
