// Function to get query parameters from the URL
function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name); // Returns the value of the query parameter
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Get the venueId from the query parameters
    const venueId = getQueryParameter("venueId");
    console.log(venueId);
    if (venueId) {
      // Fetch data from the API using the venueId
      fetch(`http://localhost:8080/api/v1/venue/${venueId}`) // Fetching data for this specific venue
        .then((response) => response.json()) // Parsing the JSON response
        .then((data) => {
          // Perform DOM manipulation based on the fetched data
            console.log(data);
        //   const titleElement = document.getElementById("title");
        //   if (titleElement) {
        //     titleElement.textContent = data.venueName; // Update the title
        //   }
  
        //   const descriptionElement = document.getElementById("description");
        //   if (descriptionElement) {
        //     descriptionElement.textContent = data.description; // Update the description
        //   }
  
        //   const imgElement = document.getElementById("venueImage");
        //   if (imgElement) {
        //     imgElement.src = data.imgSrc; // Update the image
        //   }
        })
        .catch((error) => {
          console.error("Error fetching venue data:", error);
        });
    } else {
      console.error("No venueId found in query parameters.");
    }
  });
  