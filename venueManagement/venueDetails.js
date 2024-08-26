import {baseUrl} from "../config.js";
import {getImageUrl} from "../util.js";

const API_BASE_URL = baseUrl();

document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const venueId = decodeURIComponent(urlParams.get("id"));
    const venueDetails = await getVenueDetails(venueId);

    setVenueDetails(venueDetails);
})

const getVenueDetails = async (venueId) => {

    const response = await fetch(API_BASE_URL+"venues/details?id="+venueId);

    if(response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
}

const setVenueDetails = async (venueDetails) => {
    document.getElementById("venueTitle").innerHTML = venueDetails.name;
    document.getElementById("venueLocation").innerHTML = venueDetails.address;
    document.getElementById("description").innerHTML = venueDetails.description;
    setAmenities(venueDetails.amenities);
    setVenueImages(venueDetails.images);
    document.getElementById("venuePrice").innerText = `Price: ₹${venueDetails.price} per day`;
}

const setAmenities = (amenities) => {
    let amenitiesList = document.getElementById("amenities");
    let amenitiesString = "";
    for(const amenity of amenities) {

           amenitiesString+=`<li class="list-group-item">${amenity.name}</li>`
    }
    amenitiesList.innerHTML = amenitiesString;
}

const setVenueImages=(images)=>{
    const imageContainer = document.getElementById("imageCarousel");
    let flag = true;
    imageContainer.innerHTML = "";
    for(const image of images){
        const imageDiv = document.createElement("div");
        imageDiv.className = "carousel-item";
        if(flag){
            imageDiv.classList.add("active");
            flag = false;
        }
        imageDiv.innerHTML = `<img src=${getImageUrl(image)} class="d-block w-100" alt=${image.fileName}>`
        imageContainer.appendChild(imageDiv);
    }
}