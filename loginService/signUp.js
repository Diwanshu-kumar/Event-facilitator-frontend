document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    let apiUrl;
    if (event.submitter.name === 'signupUser') {
        apiUrl = 'http://localhost:8080/api/v1/venue/user/save';
    } else if (event.submitter.name === 'signupProvider') {
        apiUrl = 'http://localhost:8080/api/v1/venue/provider/save';
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            console.log(response.body);
            if(response.body=="Duplicate Email"){
                alert("Email already Exist");
                return;
            }
            console.log(response);
            console.log('Form data submitted successfully.');
            window.open('submit.html', '_self');
            // You can add any success handling logic here
        } else {
            console.error('Failed to submit form data.');
            // You can add any error handling logic here
        }
    })
    .catch(error => {
        window.alert("There has been some error in our side");
        console.error('Error:', error);
        // You can add any error handling logic here
    });
});