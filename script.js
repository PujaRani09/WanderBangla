
// ========================================
// WANDERBANGLA - BOOKING FORM VALIDATION
// ========================================


// Get today's date
function getToday() {

    var today = new Date();

    var year = today.getFullYear();

    var month = today.getMonth() + 1;

    var day = today.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}


// Show error message
function showError(id, message) {

    document.getElementById(id).textContent = message;

}


// Clear all error messages
function clearErrors() {

    var errors = document.querySelectorAll(".booking-form .error");

    errors.forEach(function (error) {

        error.textContent = "";

    });

    document.getElementById("formMessage").textContent = "";

    document.getElementById("formMessage").className = "";

}


// ========================================
// USER DEFINED FUNCTION: FORM VALIDATION
// ========================================

function data() {

    clearErrors();

    // Get form values

    var fullName = document.getElementById("fullname").value.trim();

    var email = document.getElementById("booking-email").value.trim();

    var phone = document.getElementById("phone").value.trim();

    var destination = document.getElementById("destination").value;

    var travelDate = document.getElementById("travel-date").value;

    var people = document.getElementById("people").value.trim();

    var requests = document.getElementById("requests").value.trim();

    var formMessage = document.getElementById("formMessage");

    var isValid = true;


    // 1. Validate Full Name

    if (fullName == "") {

        showError("nameError", "Please enter your full name.");

        isValid = false;

    }

    else if (fullName.length < 2) {

        showError("nameError", "Name must contain at least 2 characters.");

        isValid = false;

    }


    // 2. Validate Email

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == "") {

        showError("emailError", "Please enter your email address.");

        isValid = false;

    }

    else if (!emailPattern.test(email)) {

        showError("emailError", "Please enter a valid email address.");

        isValid = false;

    }


    // 3. Validate Phone Number

    var phonePattern = /^(?:\+?8801|01)[3-9]\d{8}$/;

    if (phone == "") {

        showError("phoneError", "Please enter your phone number.");

        isValid = false;

    }

    else if (!phonePattern.test(phone)) {

        showError("phoneError", "Please enter a valid Bangladesh mobile number.");

        isValid = false;

    }


    // 4. Validate Destination

    if (destination == "") {

        showError("destinationError", "Please select your destination.");

        isValid = false;

    }


    // 5. Validate Travel Date

    if (travelDate == "") {

        showError("dateError", "Please select your travel date.");

        isValid = false;

    }

    else if (travelDate < getToday()) {

        showError("dateError", "Travel date cannot be in the past.");

        isValid = false;

    }


    // 6. Validate Number of Travellers

    var peopleCount = Number(people);

    if (people == "" || isNaN(peopleCount) ||
        parseInt(people) != peopleCount ||
        peopleCount < 1 || peopleCount > 50) {

        showError("travelersError", "Number of travellers must be between 1 and 50.");

        isValid = false;

    }


    // ========================================
    // 7. CHECK VALIDATION RESULT
    // ========================================

    if (isValid == false) {

        formMessage.textContent = "Please correct the errors above and try again.";

        formMessage.className = "failure";

        alert("Please fill up the form correctly!");

        return false;

    }


    // ========================================
    // 8. PROMPT BOX
    // ========================================

    if (requests == "") {

        var extraRequest = prompt(
            "Do you have any special requests? (Optional)",
            ""
        );

        if (extraRequest != null) {

            requests = extraRequest.trim();

            document.getElementById("requests").value = requests;

        }

    }


    // ========================================
    // 9. CONFIRM BOX
    // ========================================

    var confirmation = confirm(
        "Are you sure you want to submit your booking request?"
    );


    if (confirmation == false) {

        formMessage.textContent = "Booking submission cancelled.";

        formMessage.className = "failure";

        alert("Your booking request was cancelled.");

        return false;

    }


    // ========================================
    // 10. DISPLAY BOOKING INFORMATION
    // ========================================

    console.log("WanderBangla Booking Details");

    console.log("Full Name: " + fullName);

    console.log("Email: " + email);

    console.log("Phone: " + phone);

    console.log("Destination: " + destination);

    console.log("Travel Date: " + travelDate);

    console.log("Number of Travellers: " + peopleCount);

    console.log("Special Requests: " + requests);


    // ========================================
    // 11. REDIRECT TO SUCCESS PAGE
    // ========================================

    window.location.href = "success.html";

    return false;

}


// ========================================
// DOM CONTENT LOADED
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Set minimum travel date

    var travelDate = document.getElementById("travel-date");

    if (travelDate) {

        travelDate.min = getToday();

    }


    // Clear name error when typing

    var fullName = document.getElementById("fullname");

    if (fullName) {

        fullName.addEventListener("input", function () {

            showError("nameError", "");

        });

    }


    // Clear email error when typing

    var email = document.getElementById("booking-email");

    if (email) {

        email.addEventListener("input", function () {

            showError("emailError", "");

        });

    }


    // Clear phone error when typing

    var phone = document.getElementById("phone");

    if (phone) {

        phone.addEventListener("input", function () {

            showError("phoneError", "");

        });

    }


    // Clear destination error

    var destination = document.getElementById("destination");

    if (destination) {

        destination.addEventListener("change", function () {

            showError("destinationError", "");

        });

    }


    // Clear date error

    if (travelDate) {

        travelDate.addEventListener("change", function () {

            showError("dateError", "");

        });

    }


    // Clear travellers error

    var people = document.getElementById("people");

    if (people) {

        people.addEventListener("input", function () {

            showError("travelersError", "");

        });

    }

});


