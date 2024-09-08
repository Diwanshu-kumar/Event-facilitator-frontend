import {baseUrl} from "../generic-modules/config.js";
import {getImageUrl} from "../generic-modules/util.js";

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
    // console.log("venueList", venueList);
})

const filterButton = document.getElementById("filterButton");
let searchData;
let isFilterOn = false;
filterButton.addEventListener("click", async (event) => {
    event.preventDefault();
    searchData = {
        "name" : document.getElementById("searchTitle").value,
        "type" : document.getElementById("filterCategory").value,
        "date" : document.getElementById("filterDate").value,
    }
    isFilterOn = true;

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
        const data = await response.json();
        renderPagination(data.totalPages-1,data.pageable.pageNumber);
        console.log(data);
        return data.content;
    } else {
        alert("some error happened");
        return {}; // Or handle the error appropriately
    }
};

const displayVenues = async(venueList) => {
    let venueContainer = document.getElementById("venueContainer");
    venueContainer.innerHTML = "";
    for(const venue of venueList){
        let venueCard = document.createElement('div');
        venueCard.id = venue.id;
        venueCard.className = "col-md-6 mb-4";
        venueCard.innerHTML=
            `
                        <div class="card shadow-sm h-100">
                            <img src="" class="card-img-top" alt="image">
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

    // Now fetch the images and update the cards
    for (const venue of venueList) {
        const img = await getImageByVenue(venue.id);
        const imgUrl =  getImageUrl(img);
        const venueCard = document.getElementById(venue.id);

        if (venueCard) {
            const imgElement = venueCard.querySelector('.card-img-top');
            if (imgElement) {
                imgElement.src = imgUrl;
            }
        }
    }
}

const getImageByVenue = async (venueId)=>{
    const url = API_BASE_URL+"venues/resource/image?venueId="+venueId;

    const response = await fetch(url,{
        method: "GET",
    });
    if(response.ok){
        return await response.json();
    }
    return "";
}

const getVenueList =async (url,searchFilter) => {

    const response = await fetch(url,{
        method: 'GET',
        body : searchFilter
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        renderPagination(data.totalPages-1,data.pageable.pageNumber);
        return data.content;
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




function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    // Create "Previous" button
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#" tabindex="-1" ${currentPage === 1 ? 'aria-disabled="true"' : ''}>Previous</a>`;
    prevItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            updateVenue(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevItem);

    // Helper function to add page items
    function addPageItem(page, isCurrentPage) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${isCurrentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${page}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            updateVenue(page);
        });
        paginationContainer.appendChild(pageItem);
    }

    // Add first three pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        addPageItem(i, i === currentPage);
    }

    // Add ellipsis if needed
    if (totalPages > 6) {
        if (currentPage > 4) {
            paginationContainer.appendChild(createEllipsis());
        }
        // if (currentPage < totalPages - 3) {
        //     paginationContainer.appendChild(createEllipsis());
        // }
    }

    // Add pages around current page
    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);

    for (let i = start; i <= end; i++) {
        addPageItem(i, i === currentPage);
    }

    // Add last three pages
    if (totalPages > 3) {
        if (currentPage < totalPages - 3) {
            paginationContainer.appendChild(createEllipsis());
        }
        for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
            addPageItem(i, i === currentPage);
        }
    }

    // Create "Next" button
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            updateVenue(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextItem);
}

function createEllipsis() {
    const ellipsisItem = document.createElement('li');
    ellipsisItem.className = 'page-item disabled';
    ellipsisItem.innerHTML = '<span class="page-link">...</span>';
    return ellipsisItem;
}

// Example function to handle page changes
const updateVenue = async (pageNumber) =>{
    console.log(pageNumber);
    let url = API_BASE_URL+"venues/venues?pageNumber="+pageNumber;
    let venueList;
    if(isFilterOn){
        url = API_BASE_URL+"venues/resource/search?pageNumber="+pageNumber;
        venueList = await getFilteredVenue(url,searchData);
    }else{
        venueList = await getVenueList(url);
    }
    displayVenues(venueList);

}
