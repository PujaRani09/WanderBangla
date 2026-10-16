
document.addEventListener("DOMContentLoaded", function () {

    // Get form elements
    const bookingForm = document.getElementById("bookingForm");

    // Stop if this page does not contain the booking form
    if (!bookingForm) {
        return;
    }

    const fullName = document.getElementById("fullname");
    const email = document.getElementById("booking-email");
    const phone = document.getElementById("phone");
    const destination = document.getElementById("destination");
    const travelDate = document.getElementById("travel-date");
    const travelers = document.getElementById("people");
    const requests = document.getElementById("requests");
    const formMessage = document.getElementById("formMessage");


    // Get today's date in YYYY-MM-DD format
    function getToday() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // Prevent selecting a date in the past
    travelDate.min = getToday();


    // Show an error under the relevant field
    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }


    // Clear old error and status messages
    function clearErrors() {
        document.querySelectorAll(".booking-form .error")
            .forEach(function (error) {
                error.textContent = "";
            });

        formMessage.textContent = "";
        formMessage.className = "";
    }


    // Validate the form when the user submits it
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        // 1. Validate full name
        const nameValue = fullName.value.trim();

        if (nameValue.length < 2) {
            showError(
                "nameError",
                "Please enter your full name (at least 2 characters)."
            );

            isValid = false;
        }


        // 2. Validate email
        const emailValue = email.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            showError(
                "emailError",
                "Please enter a valid email address."
            );

            isValid = false;
        }


        // 3. Validate Bangladesh mobile number
        const phoneValue = phone.value.trim();

        const phonePattern = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

        if (!phonePattern.test(phoneValue)) {
            showError(
                "phoneError",
                "Enter a valid Bangladesh mobile number, e.g. 01712345678."
            );

            isValid = false;
        }


        // 4. Validate destination
        if (destination.value === "") {
            showError(
                "destinationError",
                "Please select your destination."
            );

            isValid = false;
        }


        // 5. Validate travel date
        if (travelDate.value === "") {
            showError(
                "dateError",
                "Please select your preferred travel date."
            );

            isValid = false;

        } else if (travelDate.value < getToday()) {
            showError(
                "dateError",
                "Travel date cannot be in the past."
            );

            isValid = false;
        }


        // 6. Validate number of travellers
        const peopleValue = travelers.value.trim();
        const peopleCount = Number(peopleValue);

        if (
            peopleValue === "" ||
            !Number.isInteger(peopleCount) ||
            peopleCount < 1 ||
            peopleCount > 50
        ) {
            showError(
                "travelersError",
                "Number of travellers must be between 1 and 50."
            );

            isValid = false;
        }


        // 7. Show validation result
        if (isValid) {

            formMessage.textContent =
                "Your booking form is valid! Your details are ready for submission.";

            formMessage.className = "success";

            // Display the validated data in the browser console
            console.log("WanderBangla booking form:", {
                fullName: nameValue,
                email: emailValue,
                phone: phoneValue,
                destination: destination.value,
                travelDate: travelDate.value,
                travelers: peopleCount,
                specialRequests: requests.value.trim()
            });

        } else {

            formMessage.textContent =
                "Please correct the errors above and try again.";

            formMessage.className = "failure";

        }

    });


    // Clear individual error messages when a field is edited
    fullName.addEventListener("input", function () {
        showError("nameError", "");
    });

    email.addEventListener("input", function () {
        showError("emailError", "");
    });

    phone.addEventListener("input", function () {
        showError("phoneError", "");
    });

    destination.addEventListener("change", function () {
        showError("destinationError", "");
    });

    travelDate.addEventListener("change", function () {
        showError("dateError", "");
    });

    travelers.addEventListener("input", function () {
        showError("travelersError", "");
    });

});


document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("destinationSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationCards = document.querySelectorAll(
        "#destinationGrid .destination-card"
    );

    const destinationCount = document.getElementById("destinationCount");
    const noDestinations = document.getElementById("noDestinations");

    // If the current page has no destination search, do nothing
    if (!searchInput || destinationCards.length === 0) {
        return;
    }

    let activeFilter = "all";

    function filterDestinations() {
        const searchText = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        destinationCards.forEach(function (card) {
            const title = card.querySelector("h3");
            const description = card.querySelector(".card-body");

            const searchableText = (
                (title ? title.textContent : "") + " " +
                (description ? description.textContent : "")
            ).toLowerCase();

            const category = card.dataset.category;

            const matchesSearch = searchableText.includes(searchText);

            const matchesCategory =
                activeFilter === "all" || category === activeFilter;

            const shouldShow = matchesSearch && matchesCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        destinationCount.textContent =
            visibleCount + (visibleCount === 1
                ? " destination found"
                : " destinations found");

        if (noDestinations) {
            noDestinations.hidden = visibleCount !== 0;
        }
    }

    // Search while the user types
    searchInput.addEventListener("input", filterDestinations);

    // Filter by category
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            activeFilter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterDestinations();
        });
    });

    // Show all destinations initially
    filterDestinations();

});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("destinationSearch");
    const searchButton = document.getElementById("searchButton");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationCards = document.querySelectorAll(".destination-card");
    const destinationCount = document.getElementById("destinationCount");
    const noDestinations = document.getElementById("noDestinations");

    // Run only on the destinations page
    if (!searchInput || !searchButton || destinationCards.length === 0) {
        return;
    }

    let activeFilter = "all";

    function updateDestinations() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        destinationCards.forEach(function (card) {
            const category = card.dataset.category || "";
            const text = card.textContent.toLowerCase();

            const matchesSearch = text.includes(query);
            const matchesFilter =
                activeFilter === "all" || category === activeFilter;

            const shouldShow = matchesSearch && matchesFilter;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (destinationCount) {
            destinationCount.textContent =
                visibleCount + (visibleCount === 1
                    ? " destination found"
                    : " destinations found");
        }

        if (noDestinations) {
            noDestinations.hidden = visibleCount !== 0;
        }
    }

    // Search icon click
    searchButton.addEventListener("click", function () {
        updateDestinations();
    });

    // Search while typing
    searchInput.addEventListener("input", updateDestinations);

    // Search when Enter is pressed
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            updateDestinations();
        }
    });

    // Category filter buttons
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            updateDestinations();
        });
    });

    // Show all destinations initially
    updateDestinations();
});

