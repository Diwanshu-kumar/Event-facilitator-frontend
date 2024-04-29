// Function to create a div representing a venue card
function createVenueCard(json) {
    const div = document.createElement("div");
    div.className = "box zone";
  
    const anchor = document.createElement("a");
    anchor.href = "../Home/details2.html"; // Default link
  
    const img = document.createElement("img");
    img.src = json.imgSrc;
  
    const h2 = document.createElement("h2");
    h2.className = "short-padding";
    h2.textContent = json.venueName;
  
    const p = document.createElement("p");
    p.className = "short-padding";
    p.textContent = json.description;
  
    anchor.appendChild(img);
    anchor.appendChild(h2);
    anchor.appendChild(p);
  
    div.appendChild(anchor);
  
    return div;
  }
  
  // Function to fetch data and create venue cards
  function fetchAndDisplayVenues() {
    fetch("http://localhost:8080/api/v1/venue") // Fetching data from the API
      .then((response) => response.json()) // Parsing the response as JSON
      .then((data) => {
        // The data is expected to be an array of venue objects
        const container = document.getElementById("venueContainer"); // The parent element
  
        data.forEach((item) => {
          // For each item in the data array, create a venue card
          const venueCard = createVenueCard(item);
  
          // Append the created card to the parent container
          if (container) {
            container.appendChild(venueCard);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }
  
  // Ensure the fetch function is called when the page loads
  document.addEventListener("DOMContentLoaded", fetchAndDisplayVenues);
  