document.addEventListener('DOMContentLoaded', function() {
    // Get the reference to the "Check Holiday" button
    const checkHolidayBtn = document.getElementById('checkHolidayBtn');

    // Get references to the date input, country input, and holiday info div
    const dateInput = document.getElementById('date');
    const countryInput = document.getElementById('country');
    const holidayInfoDiv = document.getElementById('holiday-info');

    // Add click event listener to the "Check Holiday" button
    checkHolidayBtn.addEventListener('click', function() {
        // Get the trimmed values of date and country code inputs
        const date = dateInput.value.trim();
        const countryCode = countryInput.value.trim().toUpperCase();

        // Check if both date and country code inputs are valid
        if (isValidDate(date) && countryCode) {
            // If valid, extract day, month, and year from the date
            const [day, month, year] = date.split('/');

            // Fetch public holidays data for the specified year and country code
            fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
                .then(response => response.json())
                .then(data => {

                // Find the holiday data for the specified date
                    
                const holiday = data.find(holiday => holiday.date === `${year}-${month}-${day}`);

                    // If holiday data is found for the date
                    if (holiday) {
                        // Extract holiday details
                        const holidayName = holiday.name;
                        const holidayCountry = holiday.countryCode;
                        const holidayIsGlobal = holiday.global;
                        const localName = holiday.localName;

                        // Check if the holiday is global and set the stringValue accordingly
                        const stringValue = holidayIsGlobal ? 'yes' : 'no';

                        // Display holiday information
                        holidayInfoDiv.textContent = `The date ${date} is a public holiday called ${holidayName} in ${holidayCountry} and its local name is ${localName}. Is it global?  ${stringValue}`;
                    } else {
                        // Display message if no holiday data found for the date
                        holidayInfoDiv.textContent = `The date ${date} is not a public holiday in ${countryCode}.`;
                    }
                })
                .catch(error => {
                    // Handle errors occurred during fetching data
                    console.error(error);
                    holidayInfoDiv.textContent = 'An error occurred while fetching the data.';
                });
        } else {
            // Display message if date or country code input is invalid
            holidayInfoDiv.textContent = 'Please enter a valid date in the format DD/MM/YYYY and a valid country code.';
        }

    });

    // Add input event listener to date and country inputs
    dateInput.addEventListener('input', function() {
        // Clear holiday info when date input changes
        holidayInfoDiv.textContent = '';
    });

    countryInput.addEventListener('input', function() {
        // Clear holiday info when country input changes
        holidayInfoDiv.textContent = '';
    });

    // Function to validate date format
    function isValidDate(dateString) {
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        return pattern.test(dateString);
    }

});
