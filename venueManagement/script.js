document.getElementById("listingForm").addEventListener("submit", function(event) {
    console.log(event);
    event.preventDefault();
    
    // Get form data
    let formData = new FormData(this);
    const img =document.querySelector('#show img');
    // Convert FormData to JSON object
    let jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    jsonObject = {...jsonObject,  'imgSrc': img.src}
    jsonObject = {...jsonObject, 'providerId':localStorage.getItem('id')}

    console.log(jsonObject)

    
    // Send data to API
    const apiUrl = 'http://localhost:8080/api/v1/venue';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {
        if (response.ok) {
            window.open('submit.html', '_self');
            console.log(jsonObject);
            console.log('Form data submitted successfully.');
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

