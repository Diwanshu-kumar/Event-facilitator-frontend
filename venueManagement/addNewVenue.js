import {baseUrl} from "../config.js";

const API_BASE_URL = baseUrl();


// Image Preview
const venueImages = document.getElementById('venueImages');
const imagePreview = document.getElementById('imagePreview');

venueImages.addEventListener('change', function () {
    imagePreview.innerHTML = '';
    const files = venueImages.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
});

document.getElementById('venueDetails').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = await getFormData();

    const response = await fetch(API_BASE_URL + "venues/venues", {
        method: 'POST',
        body: formData,
    });
    if (response.ok) {
        const message = await response.text();
        alert(message);
    }

});


const getCheckedAmenities = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    const checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push((checkbox.value));
    });

    return checkedValues;
}


const getFormData = () => {
    const formData = new FormData();

    formData.append("name", document.getElementById('venueName').value);
    formData.append("type", document.getElementById('venueType').value);
    formData.append("address", document.getElementById('venueAddress').value);
    formData.append("city", document.getElementById('city').value);
    formData.append("capacity", document.getElementById('capacity').value);
    formData.append("parkingCapacity", document.getElementById('parkingCapacity').value);
    formData.append("price", document.getElementById('price').value);

    const dimension = document.getElementById('length').value + " " +
        document.getElementById("width").value + " " +
        document.getElementById("height").value;

    formData.append("dimensions", dimension);
    formData.append("shortDescription", document.getElementById('shortDescription').value);
    formData.append("description", document.getElementById('fullDescription').value);
    formData.append("phone", document.getElementById("mobileNumber").value);
    formData.append("email", document.getElementById('email').value);
    const checkedAmenity = getCheckedAmenities();
    formData.append("amenityIds ", checkedAmenity);
    const venueImages = document.getElementById('venueImages').files;
    for (let i = 0; i < venueImages.length; i++) {
        formData.append('image', venueImages[i]);
    }
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
    return formData;
}