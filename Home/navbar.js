// This JavaScript code runs when the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Check if a specific key exists in localStorage
    const key = "id";
    const storedValue = localStorage.getItem(key);

    // Get a reference to the element you want to modify
    const element = document.getElementById("loginLogout");
    
    if (storedValue>0) {
        // If the key exists in localStorage, update the DOM element
        element.innerHTML="";
        var profile;
        if(localStorage.getItem('userType')==='provider'){
            profile = document.createElement("a");
            profile.href="../venueManagement/VenueList.html";
            profile.innerHTML = localStorage.getItem('fullName');
            element.appendChild(profile);
        }else{
            element.innerHTML = localStorage.getItem('fullName');
        }
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.id = "logoutButton";

        logoutButton.style.border = "none"; // Remove border
        logoutButton.style.background = "none"; // Remove background
        logoutButton.style.color = "blue"; // Set text color
        logoutButton.style.textDecoration = "underline"; // Underline text to indicate it's clickable
        logoutButton.style.cursor = "pointer"; // Change cursor on hover

        element.appendChild(logoutButton);
    
        function handleLogout() {
            // Clear client-side session data
            localStorage.setItem('id','0'); // Example: Clearing an authentication token
        //   sessionStorage.clear(); // Clear all session data
        
            // Redirect to the login page or another location
          window.location.href = "../Home/index.html"; // Redirect after logout
        }
        logoutButton.addEventListener("click", handleLogout);
    }
});

  