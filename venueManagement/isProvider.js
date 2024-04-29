// This script should run before the page content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Define the key to check in localStorage
    const keyToCheck = "userType"; // Example key
  
    // Check if the key is present in localStorage
    const keyExists = localStorage.getItem(keyToCheck) !== 'provider';
    console.log(localStorage.getItem(keyToCheck));
    console.log(keyExists);
  
    if (keyExists || localStorage.getItem('id')=='0') {
      // If the key is not present, redirect to the desired page
      alert("please login as a provider")
      window.location.href = "../Home/index.html"; // Redirect to the login page or another
    }
  });
  