function initialize(){
    var status="Offline";
    if(navigator.Online){
        status="Online";
        retrieveContacts();//to retrieve the json file online
    }else{ //if the status if offline
        const localStorage=window.localStorage;//create a local storage
        if(localStorage){
            const contacts=localStorage.getItem("contacts"); //get the contact info from the local storage by using the contacts name
            if(contacts){ //if the contact info is not empty ,then display the contact info to the HTML
                displayContacts(JSON.parse(contacts));
            }
        }
    }

    document.getElementById("status").innerHTML=status;//set the status of browser

    document.body.addEventListener("online",function(){document.getElementById("status").innerHTML="Online";},false);
    document.body.addEventListener("offline",function(){document.getElementById("status").innerHTML="Offline";},false);
}

function retrieveContacts(){
    const xhr=new XMLHttpRequest(); //make http request to the server
    const url="contacts.json";//url of the json file

    xhr.onreadystatechange=function(){  //when the loading status changes everytime,call this function
        if(xhr.readyState===4){ //means the data is completely ready in the server
            var contacts=JSON.parse(xhr.response).contacts;//xhr.response is string , need to change to JSON format
                //contacts means the contact info of each person
            displayContacts(contacts);//display this contact info to the HTMl Table
            //after displaying the contact info to the HMTL, save it into the local storage
            const localStorage= window.localStorage;
            if(localStorage){
                localStorage.setItem("contacts",JSON.stringify(contacts));//save the contact in the local storage
            }
        }
    }
    xhr.open("get",url);//open this url
    xhr.send();  //send the request to the server
}

function displayContacts(contacts){
    contacts.forEach(addRow);//forEach is a method to extract the element of the contact one by one
}     //and put it into the new function addRow

function addRow(contact){
    var tcontent=document.getElementById("tcontent");//tcontent is the id of tbody in html
    var row=tcontent.insertRow();// insert a new row of the table body

    var nameCell=row.insertCell();//insert cell of the new-inserted row
    nameCell.setAttribute('data-label',"Name");
    nameCell.innerHTML=contact.name;

    var addressCell=row.insertCell();
    addressCell.setAttribute('data-label',"Address");
    addressCell.innerHTML=contact.address;

    var emailCell=row.insertCell();
    emailCell.setAttribute('data-label',"Email");
    emailCell.innerHTML=contact.email;

}