document.getElementById('reservationForm').addEventListener('submit', function(event){
    event.preventDefault()

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    const roomType = document.getElementById('roomType').value;
    const numPersonsInput = document.getElementById('numPersons');
    const numPersons = parseInt(numPersonsInput.value);


    document.getElementById('firstNameError').innerText = '';
    document.getElementById('lastNameError').innerText = '';
    document.getElementById('addressError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('checkInError').innerText = '';
    document.getElementById('checkOutError').innerText = '';
    document.getElementById('roomTypeError').innerText = '';
    document.getElementById('numPersonsError').innerText = '';

    let Valid = true;

    // Validate first name

    if (!firstName.match(/^[A-Za-z]+$/)) {
        document.getElementById('firstNameError').innerText = 'First name should only contain letters.';
        Valid = false;
    }

    // Validate last name

    if (!lastName.match(/^[A-Za-z]+$/)) {
        document.getElementById('lastNameError').innerText = 'Last name should only contain letters.';
        Valid = false;
    }

    // Validate Address

    if (address.trim() === '') {
        document.getElementById('addressError').innerText = ' Enter a valid Address';
        Valid = false;
    } 

      // Validate email

    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        document.getElementById('emailError').innerText = ' Enter a valid Email';
        Valid = false;
    } 

    // Validate phone number

    if (!phone.match(/^\d{11}$/)) {
        document.getElementById('phoneError').innerText = 'Phone number should be 10 digits.';
        Valid = false;
    }

    // Validate check-in and check-out dates

    const now = new Date();
    if (checkIn < now) {
        document.getElementById('checkInError').innerText = 'Check-in date must be in the future.';
        Valid = false;
    }

    if (checkIn >= checkOut) {
        document.getElementById('checkOutError').innerText = 'Check-out date must be after check-in date.';
        Valid = false;
    }

    // Validate number of persons input

    if (numPersonsInput.value === '') {
        document.getElementById('numPersonsError').innerText = 'Number of persons is required.';
        Valid = false;
    } 

    // Validate number of persons for room type

    const roomCapacity = { 'single': 1, 'double': 2, 'suite': 4, 'Deluxe': 3, 'Presidential Suites': 5 };
    if (numPersons > roomCapacity[roomType]) {
        document.getElementById('numPersonsError').innerText = 'Number of persons exceeds room capacity.';
        Valid = false;
    }

    if (!Valid) return;

    // Calculate number of nights

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));

    // Simulate room availability check

    const availableRooms = { 'single': 3, 'double': 5, 'suite': 2, 'Deluxe': 0, 'Presidential Suites': 1 };
    if (availableRooms[roomType] <= 0) {
        document.getElementById('availableRooms').innerText = 'No rooms available.';
        return;
    }

    // Calculate cost

    const roomPricing = { 'single': 100, 'double': 150, 'suite': 300, 'Deluxe': 350, 'Presidential Suites': 500 };
    const totalCost = diffDays * roomPricing[roomType];

    // Display available rooms

    const rooms = Array.from({ length: availableRooms[roomType] }, (_, i) => `${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room ${i + 1}`);
    const roomsHtml = rooms.map(room => `<label><input type="radio" name="selectedRoom" value="${room}"> ${room}</label>`).join('<br>');
    document.getElementById('availableRooms').innerHTML = `
        <p>Select a Room:</p>
        ${roomsHtml}
        <button type="button" id="confirmBookingButton">Confirm Booking</button>
    `;

    document.getElementById('confirmBookingButton').addEventListener('click', confirmBooking);

    document.getElementById('summary').innerText = '';

    
})


function confirmBooking() {
    const selectedRoom = document.querySelector('input[name="selectedRoom"]:checked');
    if (!selectedRoom) {
        alert('Please select a room.');
        return;
    }

    // Get the remaining details

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    const roomType = document.getElementById('roomType').value;
    const numPersons = parseInt(document.getElementById('numPersons').value);

    // Calculate number of nights

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));

    // Calculate room cost

    const roomCost = { 'single': 100, 'double': 150, 'suite': 200, 'Deluxe': 350, 'Presidential Suites': 500 };
    const totalCost = diffDays * roomCost[roomType];

  //  document.getElementById('availableRooms').style.display = "block"

    document.getElementById('availableRooms').innerText = '';

    // Display booking summary

    document.getElementById('summary').innerHTML = `
        <p>Booking Summary:</p>
        <p>Name: ${firstName} ${lastName}</p>
        <p>Address: ${address}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Check-in: ${checkIn.toLocaleString()}</p>
        <p>Check-out: ${checkOut.toLocaleString()}</p>
        <p>Room Type: ${roomType}</p>
        <p>Number of Persons: ${numPersons}</p>
        <p>Selected Room: ${selectedRoom.value}</p>
        <p>Number of Nights: ${diffDays}</p>
        <p>Total Cost: $${totalCost}</p></br>
        <button>Print Reservation</button>
    `;
}

    // // Show booking summary
    // const summary = `
    //     Booking Summary:
    //     Name: ${firstName} ${lastName}
    //     Address: ${address}
    //     Phone: ${phone}
    //     Email: ${email}
    //     Check-in: ${checkIn.toLocaleString()}
    //     Check-out: ${checkOut.toLocaleString()}
    //     Room Type: ${roomType}
    //     Number of Nights: ${diffDays}
    //     Number of Persons: ${numPersons}
    //     Total Cost: $${totalCost}
    // `;
    // document.getElementById('summary').innerText = summary;

