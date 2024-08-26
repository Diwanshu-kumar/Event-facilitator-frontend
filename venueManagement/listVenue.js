import {baseUrl} from "../config.js";
import {getImageUrl} from "../util.js";

const API_BASE_URL = baseUrl();

const urlParam = new URLSearchParams(window.location.search);
const filterCategory = urlParam.get("category");

document.addEventListener("DOMContentLoaded",  async (event)=> {
    event.preventDefault();
    if(filterCategory){
        console.log(filterCategory);
        document.getElementById("filterCategory").value = filterCategory;
        filterButton.click();
        return;
    }
    const venueFetchUrl = API_BASE_URL+"venues/venues";
    const venueList = await getVenueList(venueFetchUrl);
    displayVenues(venueList);
    console.log("venueList", venueList);
})

const filterButton = document.getElementById("filterButton");

filterButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const searchData = {
        "name" : document.getElementById("searchTitle").value,
        "type" : document.getElementById("filterCategory").value,
        "date" : document.getElementById("filterDate").value,
    }

    const filteredVenueUrl = API_BASE_URL+"venues/resource/search";
    const filteredVenueList  = await getFilteredVenue(filteredVenueUrl,searchData);

    const venueContainer = document.getElementById("venueContainer");

    if(filteredVenueList===null || filteredVenueList.length===0){
        venueContainer.innerHTML ="";
        venueContainer.append(createMessage("No Venue found! "));
        return;
    }else{
        venueContainer.innerHTML = "";
        let selectedFilter = "";
        if(searchData.name){
            selectedFilter +=  `title : ${searchData.name}  `;
        }
        if(searchData.type){
            selectedFilter += `category : ${searchData.type} `;
        }
        if(searchData.date){
            selectedFilter += `date : ${searchData.date}`;
        }
        venueContainer.append(createMessage(`Search result for ${selectedFilter}`));
    }

    displayVenues(filteredVenueList);
    console.log(searchData);

})


const createMessage = (message) =>{
    const messageDiv = document.createElement("div");
    messageDiv.className = "card shadow-sm p-5 my-2";
    messageDiv.innerHTML = `<h3 class="d-flex justify-content-center">${message}</h3>`;
    return messageDiv;
}

const getFilteredVenue = async (filteredVenueUrl, searchParameter) => {
    const response = await fetch(filteredVenueUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the correct content type
        },
        body: JSON.stringify(searchParameter)
    });

    if (response.ok) {
        const venues = await response.json();
        console.log(venues);
        return venues;
    } else {
        alert("some error happened");
        return {}; // Or handle the error appropriately
    }
};

const displayVenues = (venueList) => {
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
}

const getVenueList =async (url,searchFilter) => {

    const response = await fetch(url,{
        method: 'GET',
        body : searchFilter
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