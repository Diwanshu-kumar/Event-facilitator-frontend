import {baseUrl} from "../generic-modules/config.js";

const API_BASE_URL = baseUrl();

const cancelButton = document.querySelector("#cancelBooking");

cancelButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const paymentModal = document.getElementById("paymentModal");
    const bookingId = paymentModal.getAttribute("data-bookingId");
    console.log(paymentModal);
    console.log(bookingId);

    cancelBooking(bookingId);
});

const cancelBooking = async (bookingId) => {
    const url = `${API_BASE_URL}bookings/cancelBooking?bookingId=${bookingId}`;
    const response = await fetch(url,{
        method: "POST"

    })

    if(response.ok){
        const bookingConfirmation = await response.text();
        alert(bookingConfirmation);

    }else{
        const errorMessage = await response.text();
        alert(errorMessage);

    }

}