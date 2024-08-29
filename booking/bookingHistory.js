import {baseUrl} from "../generic-modules/config.js";

const API_BASE_URL = baseUrl();

document.addEventListener("DOMContentLoaded", async () => {

    const bookingHistoryData = await bookingHistory();
    if(bookingHistoryData) {
        showBookingHistory(bookingHistoryData);
    }
})


const showBookingHistory = (bookingHistoryData) => {
    const bookingHistoryContainer = document.getElementById("bookingHistoryContainer");

    for(const booking of bookingHistoryData){
        // if(booking.status==="cancelled")continue;
        const div = document.createElement("div");
        div.className ="row";
        const statusClass = (booking.status==="confirmed"?"success":"danger");
        div.innerHTML = `          
            <div class="col-md-9">
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
            <div class="col-md-3 card ">
                <div class="card-body text-center">
                    <button data-bookingId=${booking.bookingId} class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#paymentModal">View Payment Breakup</button>
                    <p>status : <span class="text-${statusClass}">${booking.status}</span></p>
                </div>
            </div>
            <hr class="my-4">
            `;
        bookingHistoryContainer.append(div);

        const cancelButton = div.querySelector("[data-bs-toggle=modal]");
        cancelButton.addEventListener("click", ()=>{
            const bookingId = cancelButton.getAttribute("data-bookingId");
            console.log(bookingId);
            const paymentModal = document.getElementById("paymentModal");
            paymentModal.setAttribute("data-bookingId", bookingId);
            console.log(paymentModal);
            console.log(cancelButton);
        });


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