document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var jsonData = {};

    formData.forEach(function(value, key){
        jsonData[key] = value;
    });
    window.localStorage.clear;
    var url;
    var userType='none';
    if (event.submitter.name === 'loginUser') {
        userType='user';
        url = 'http://localhost:8080/api/v1/venue/user/login';
    } else if (event.submitter.name === 'loginProvider') {
        userType='provider';
        url = 'http://localhost:8080/api/v1/venue/provider/login';
    }
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to submit form data.');
        }
    })
    .then(data => {
        window.localStorage.setItem('userType',userType);
        window.localStorage.setItem("id",data['id']);
        window.localStorage.setItem('fullName',data['fullName']);
        if(data['id']==0){
            window.alert("wrong id or password");
            return
        }else{
            window.open("../index.html","_self");
        }

    })
    .catch(error => {
        console.error('Error:', error);
        // You can handle errors here
        alert('There was an error during login.');
    });
});
