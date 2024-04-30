document.addEventListener("DOMContentLoaded", function () {
    // Function to get a query parameter from the URL
    function getQueryParameter(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }
  
    // Get the venueId from the query parameters
    const venueId = getQueryParameter("venueId");
  
    if (venueId) {
      // Fetch data from the API using the venueId
      fetch(`http://localhost:8080/api/v1/venue/${venueId}`) // Fetching data for this specific venue
        .then((response) => response.json())
        .then((data) => {
          // Update the DOM with the fetched data
  
          document.getElementById("title").textContent = data.venueName;
          document.getElementById("venueImage").src = data.imgSrc;
          document.getElementById("description").textContent = data.description;
            
          if(data.acAvailable==null){
            document.getElementById("acAvailable").textContent = `AC Available : NO`;
          }else
            document.getElementById("acAvailable").textContent = `AC Available: ${data.acAvailable}`;
        if(data.djAvailable==null){
            document.getElementById("djAvailable").textContent = `DJ Available: NO`;
        }else
            document.getElementById("djAvailable").textContent = `DJ Available: ${data.djAvailable}`;
          document.getElementById("contactNumber").textContent = `Contact: ${data.contactNumber}`;
          document.getElementById("managerName").textContent = `Manager: ${data.managerName}`;
          document.getElementById("managerEmail").textContent = `Email: ${data.managerEmail}`;
          document.getElementById("city").textContent = `City: ${data.city}`;
          document.getElementById("district").textContent = `District: ${data.district}`;
          document.getElementById("parkingCapacity").textContent = `Parking Capacity: ${data.parkingCapacity}`;
          document.getElementById("pinCode").textContent = `Pin Code: ${data.pinCode}`;
          document.getElementById("price").textContent = `Price: $${data.price}`;
        })
        .catch((error) => {
          console.error("Error fetching venue data:", error);
        });
    } else {
      console.error("No venueId found in query parameters.");
    }
  });
  