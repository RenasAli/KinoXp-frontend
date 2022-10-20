

function addCustomer(email, firstname){

    let request = new XMLHttpRequest();
    request.open("POST", baseURL + "api/customer/add")

    request.setRequestHeader("Accept", "application/json");

    // UTF-08 ER MEGA VIGTIG HVIS DET SKAL VIRKE!!!!!!!!!!!!!
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
      
    
    let customerData = `{
        "ferstName": ${JSON.stringify(firstname)},
        "email": ${JSON.stringify(email)}
        }`;
        
    
    
    request.send(customerData);
        

    
    
}
