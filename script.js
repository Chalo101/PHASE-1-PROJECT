document.addEventListener('DOMContentLoaded', function() {
    // Get the reference to the "Check Holiday" button
    const checkHolidayBtn = document.getElementById('checkHolidayBtn');

    // Add click event listener to the "Check Holiday" button
    checkHolidayBtn.addEventListener('click', function() {

        // Get references to the date input, country input, and holiday info div
        const dateInput = document.getElementById('date');
        const countryInput = document.getElementById('country');
        const holidayInfoDiv = document.getElementById('holiday-info');

        // Get the trimmed values of date and country code inputs
        const date = dateInput.value.trim();
        const countryCode = countryInput.value.trim().toUpperCase();

        // Check if both date and country code inputs are valid
        if (isValidDate(date) && countryCode) {
            // If valid, extract day, month, and year from the date
            const [day, month, year] = date.split('/');
        } else {
            // Display message if date or country code input is invalid
            holidayInfoDiv.textContent = 'Please enter a valid date in the format DD/MM/YYYY and a valid country code.';
        }
    
        
        
    });
});