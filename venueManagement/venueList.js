function createHallDiv(json) {
    // Create the outer div with the class "hall"
    const hallDiv = document.createElement("div");
    hallDiv.className = "hall";
    hallDiv.id = json.id;
    // Create the image element with the specified source and alt text
    const img = document.createElement("img");
    img.src = json.imgSrc; // Image source from JSON
    img.alt = `Image of ${json.venueName}`; // Alternative text
  
    // Create the description div
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "hall-description";
  
    // Create the h2 element for the venue name
    const h2 = document.createElement("h2");
    h2.id = "VenueName"; // ID for the venue name
    h2.textContent = json.venueName; // Venue name from JSON
  
    // Create the paragraph for the description
    const p = document.createElement("p");
    p.id = "venue-description"; // ID for the description
    p.textContent = json.description; // Description from JSON
  
    // Append the h2 and p elements to the description div
    descriptionDiv.appendChild(h2);
    descriptionDiv.appendChild(p);
  
    // Create the buttons div
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "hall-buttons";
  
    // Create the Modify button with a link
    const modifyAnchor = document.createElement("a");
    modifyAnchor.href = "modify.html";
    const modifyButton = document.createElement("button");
    modifyButton.className = "modify";
    modifyButton.textContent = "Modify";
    modifyAnchor.appendChild(modifyButton);
  
    // Create the Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        deleteVenue(json.venueId); // Call deleteVenue with the venueId
      });
  
    // Create the Details button with a link
    const detailsAnchor = document.createElement("a");
    detailsAnchor.href = `../Home/details2.html?venueId=${json.venueId}`; // Link to the details page
    const detailsButton = document.createElement("button");
    detailsButton.className = "details";
    detailsButton.textContent = "Details";
    detailsAnchor.appendChild(detailsButton);
  
    // Append the buttons to the buttons div
    buttonsDiv.appendChild(modifyAnchor);
    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(detailsAnchor);
  
    // Append all parts to the outer hallDiv
    hallDiv.appendChild(img); // Add the image
    hallDiv.appendChild(descriptionDiv); // Add the description
    hallDiv.appendChild(buttonsDiv); // Add the buttons
  
    return hallDiv; // Return the complete div
}


// Function to delete a venue by ID
function deleteVenue(venueId) {
    fetch(`http://localhost:8080/api/v1/venue/${venueId}`, {
      method: "DELETE", // Send a DELETE request
    })
      .then((response) => {
        if (response.ok) {
          alert(`Venue deleted successfully.`);
  
          // Optionally, remove the corresponding div from the DOM
          const hallDiv = document.getElementById(`venue-${venueId}`);
          if (hallDiv) {
            hallDiv.remove(); // Remove the element from the DOM
          }
          window.open('../venueManagement/VenueList.html','_self');
        } else {
          console.error("Failed to delete venue:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error while deleting venue:", error);
      });
  }
function fetchAndDisplayVenues(providerId) {
    fetch(`http://localhost:8080/api/v1/venue/providerId/${providerId}`)
      .then((response) => response.json()) // Parse the JSON data
      .then((data) => {
        const parentElement = document.getElementById("hallContainer"); // Parent element to add the divs
        
        data.forEach((venue) => {
          const hallDiv = createHallDiv(venue); // Create a div for each venue
          if (parentElement) {
            parentElement.appendChild(hallDiv); // Append the div to the parent
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayVenues(localStorage.getItem('id')); // Example providerId; replace with the actual ID you need
  });
  