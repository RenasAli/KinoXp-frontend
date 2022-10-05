const usernameForm = document.getElementById("usernameForm")
const passwordForm = document.getElementById("passwordForm")
const loginButton = document.getElementById("loginButton")


var userLogin = null

async function fetchDataByUrl(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const testFailLogin = document.getElementById('loginFail')
    
    fetchDataByUrl("http://localhost:8080/get/user/" + usernameForm.value).then(data => {
    

    //man skal lige nu klikke 2 gange
    if(passwordForm.value === data.password){
        testFailLogin.style.display = 'none'
        loginButton.setAttribute("data-dismiss", "modal")
        userLogin = data
    }else{
        //password i input ikke passer med det password brugeren har
        testFailLogin.style.display = 'block'
        testFailLogin.innerHTML = "The password you've entered is incorrect."
        
    }
}).catch(error => {
    testFailLogin.style.display = 'block'
    testFailLogin.innerHTML = "The username you've entered does not exist."
})
    


})



