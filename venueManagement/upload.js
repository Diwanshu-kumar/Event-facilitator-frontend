// document.addEventListener("DOMContentLoaded", function() {
    // Get the upload form
    const form = document.querySelector(".imgUploadBtn");
    console.log(form);
    // Add event listener for form submission
    form.addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the selected file
        const fileInput = document.getElementById("image");
        const file = fileInput.files[0];

        if (file) {
            // Create a FormData object to send the file to the server
            const formData = new FormData();
            formData.append("image", file);

            // Send the file to the server using Fetch API
            const res = fetch("http://localhost:8080/api/v1/events/file/upload", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Upload failed");
                }
            })
            .then(data => {
                // Display success message
                console.log(data);
                console.log(window.location)
               const imgFile= document.querySelector('#show img');
               imgFile.src = '..' + data;
               imgFile.style.width = "200px";

            })
            .catch(error => {
                // Display error message
                console.error(error.message);
            });
        } else {
            console.error("No image selected");
        }
    });
// });
