import {baseUrl} from "../config.js";
import {getImageUrl} from "../util.js";

const API_BASE_URL = baseUrl();

document.addEventListener("DOMContentLoaded",  async (event)=> {
    event.preventDefault();

    const venueList = await getVenueList();
    let venueContainer = document.getElementById("venueContainer");
    for(const venue of venueList){
        let venueCard = document.createElement('div');
        venueCard.id = venue.id;
        venueCard.className = "col-md-6 mb-4";
        venueCard.innerHTML=
        `
                        <div class="card shadow-sm h-100">
                            <img src=${getImageUrl(venue.img)} class="card-img-top" alt="Venue 1">
                            <div class="card-body">
                                <a href="venueDetails.html?id=${venue.id}"><h5 class="card-title">${venue.name}</h5></a>
                                <p class="card-text"><strong>Capacity:</strong> ${venue.capacity} people</p>
                                <p class="card-text"><strong>Phone:</strong> ${venue.phone}</p>
                                <p class="card-text"><strong>Features:</strong> ${getAmenities(venue.amenities)}</p>
                                <a href="#" class="btn btn-primary w-100">Book Now</a>
                            </div>
                        </div>
        `
        venueContainer.appendChild(venueCard);
    }
    console.log("venueList", venueList);
})

const getVenueList =async () => {

    const response = await fetch(API_BASE_URL+"venues/venues",{
        method: 'GET',
    });
    if (response.ok) {
        return await response.json();
    }else if(response.status === 404){
        alert('Venue Not Found');
    }else{
        alert('Some error occurred');
    }
}



const getAmenities = (amenitiesAPIResponse)=>{
    let amenitiesString = "";
    for(const amenities of amenitiesAPIResponse){
        amenitiesString  = amenitiesString + `${amenitiesString===""?"":", "}` + amenities.name;
    }
    return amenitiesString;
}