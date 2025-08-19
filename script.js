document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('startDateInput');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const greeting = document.getElementById('greeting');
    const dayCounter = document.getElementById('dayCounter');
    const setupSection = document.getElementById('setup-section');
    const trackerSection = document.getElementById('tracker-section');

    // Function to calculate and display the number of days
    function displayDays() {
        const startDate = localStorage.getItem('startDate');
        if (startDate) {
            const today = new Date();
            const start = new Date(startDate);
            const timeDifference = today.getTime() - start.getTime();
            const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (dayDifference >= 0) {
                greeting.textContent = "Congratulations!";
                dayCounter.textContent = `${dayDifference} days`;
                setupSection.style.display = 'none';
                trackerSection.style.display = 'flex';
            } else {
                // Handle future date scenario
                greeting.textContent = "Please select a date in the past or today.";
                setupSection.style.display = 'flex';
                trackerSection.style.display = 'none';
            }
        } else {
            // No start date found, show the setup section
            greeting.textContent = "Welcome! Enter your start date below.";
            setupSection.style.display = 'flex';
            trackerSection.style.display = 'none';
        }
    }

    // Event listener for the "Start Tracking" button
    saveButton.addEventListener('click', () => {
        const selectedDate = startDateInput.value;
        if (selectedDate) {
            localStorage.setItem('startDate', selectedDate);
            displayDays();
        } else {
            alert("Please select a date to begin.");
        }
    });

    // Event listener for the "Reset" button
    resetButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
            localStorage.removeItem('startDate');
            displayDays(); // Re-run to show the setup screen
        }
    });

    // Run on page load to check for existing data
    displayDays();
});