import {baseUrl} from "../generic-modules/config.js";

const API_BASE_URL = baseUrl();
const urlParams = new URLSearchParams(window.location.search);

const venueId = urlParams.get("id");


const bookNow = document.getElementById("bookNow");

bookNow.addEventListener("click", (e) => {
    e.preventDefault();

    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    const bookingDate = {
        userId : 1,
        venueId : venueId,
        startDate : startDate,
        endDate : endDate,
    }
    bookVenue(bookingDate);
    console.log(bookingDate);
})

const bookVenue =  async (bookingData) =>{
    const url = API_BASE_URL+"bookings/bookVenue";

    const response  = await fetch(url,{
        method:"POST",
        headers:{"Accept":"application/json","Content-Type":"application/json"},
        body:JSON.stringify(bookingData),
    })

    if(response.ok){
        const bookingConfirmation  = await response.text();
        alert(bookingConfirmation);
    }else{
        const errorMessage = await response.text();
        alert(errorMessage);
    }
}