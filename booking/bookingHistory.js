import {baseUrl} from "../generic-modules/config.js";

const API_BASE_URL = baseUrl();

document.addEventListener("DOMContentLoaded", async () => {

    const bookingHistoryData = await bookingHistory();
    if(bookingHistoryData) {
        showBookingHistory(bookingHistoryData);
    }
})


const showBookingHistory = (bookingHistoryData) => {
    console.log(bookingHistoryData);
    const bookingHistoryContainer = document.getElementById("bookingHistoryContainer");

    for(const booking of bookingHistoryData){
        const div = document.createElement("div");
        div.className ="row mb-2";
        div.innerHTML = `          
            <div class="col-md-8">
                <a href="../venueManagement/venueDetails.html?id=${booking.venueId}"><h5 id="venueName">${booking.venueName}</h5></a>
                <div class="d-flex">
                    <p id="startDate">
                        From ${booking.startDate} to
                    </p>
                    <p id="endDate"> ${booking.endDate}</p>
                </div>
                <p class="capacity">Capacity : ${booking.capacity}</p>
                <p>Location: ${booking.venueAddress}, ${booking.city}</p>
            </div>
            <div class="col-md-4 text-end">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentModal">View Payment Breakup</button>
            </div>
            <hr>
            `;
        bookingHistoryContainer.append(div);
    }
}

const bookingHistory = async () => {
    const url = `${API_BASE_URL}bookings/history?userId=1`;

    const response = await fetch(url,{
        method: "GET"
    });

    if(response.ok){
        return await response.json();
    }else{
        alert("Some error occurred");
        console.log(response.status);
    }
    return null;

}