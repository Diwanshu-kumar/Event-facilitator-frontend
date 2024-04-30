// // Function to delete a venue by ID
// function deleteVenue(venueId) {
//     fetch(`http://localhost:8080/api/v1/venue/${venueId}`, {
//       method: "DELETE", // Send a DELETE request
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log(`Venue with ID ${venueId} deleted successfully.`);
  
//           // Optionally, remove the corresponding div from the DOM
//           const hallDiv = document.getElementById(`venue-${venueId}`);
//           if (hallDiv) {
//             hallDiv.remove(); // Remove the element from the DOM
//           }
//         } else {
//           console.error("Failed to delete venue:", response.statusText);
//         }
//       })
//       .catch((error) => {
//         console.error("Error while deleting venue:", error);
//       });
//   }

//   const deleteButton = document.getElementsByClassName('delete-venue');
// if(deleteButton)
//   deleteButton.addEventListener("click", function () {
//     deleteVenue(deleteButton.parentElement.parentElement.id); // Call deleteVenue with the venueId
//   });