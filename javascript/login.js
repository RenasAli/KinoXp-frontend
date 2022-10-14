
const usernameForm = document.getElementById("usernameForm")
const passwordForm = document.getElementById("passwordForm")
const loginButton = document.getElementById("loginButton")
const navLogOut = document.getElementById("navLogOut")
const navLogIn = document.getElementById("navLogIn")
const createFilmShowing = document.getElementById("createFilmShowingModalButton")






loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const testFailLogin = document.getElementById('loginFail')
    

    fetchDataByUrl(`${baseURL}/get/user/` + usernameForm.value).then(data => {
    

    //man skal lige nu klikke 2 gange
    if(passwordForm.value === data.password){
        testFailLogin.style.display = 'block'
        testFailLogin.innerHTML = "You have succesfully been logged in"
        testFailLogin.style.color = "green"
        userLogin = data
        navLogIn.style.display = 'none'
        navLogOut.style.display = 'block'
        isAdmin = true
        loginButton.setAttribute("data-bs-dismiss", "modal")
        loginButton.setAttribute("data-dismiss", "modal")
        loginButton.setAttribute("aria-label", "Close")

        /* Denne her klikker på login knappen uendeligt mange gange
        function clickButton(){
            document.getElementById("loginButton").click();
        }
        clickButton(1);
*/
        navLogOut.addEventListener('click', (e) => {
            location.reload()
        })

        
        if(userLogin.type === 'admin'){
            whenAdmin()
        }
       
        
        

        

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



function whenAdmin(){
    const createMovieButton = document.getElementById('modal2')
    
    createMovieButton.style.display = 'block'
    createFilmShowing.style.display = 'block'
}




