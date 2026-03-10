document.getElementById("login-btn").addEventListener("click",function(){
    
    let numberInput=document.getElementById("input-number")
    let contactNumber=numberInput.value
    console.log(contactNumber)


     let inputPin=document.getElementById("input-pin")
    let Pin=inputPin.value
    console.log(Pin)


    if(contactNumber=="admin" && Pin=="1234"){
        alert("login success")
        // window.location.replace("./home.html")
        window.location.assign("./index.html")
    }
    else{
        alert("login failed")
        return;
    }
})