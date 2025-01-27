// Function to start the timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Function to update the fastest lap information
function updateFastestLap(athleteName, lapTime) {
    var fastestLapBanner = document.getElementById('fastest-lap');
    document.getElementById('athlete-name').textContent = athleteName;
    document.getElementById('lap-time').textContent = lapTime;
    fastestLapBanner.style.display = 'flex';  // Show the banner

    // Store the fastest lap information in localStorage
    localStorage.setItem('fastestLap', JSON.stringify({ athleteName, lapTime }));
}

// Initialize the timer when the window loads
window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);

    // Retrieve the fastest lap information from localStorage
    var fastestLap = JSON.parse(localStorage.getItem('fastestLap'));
    if (fastestLap) {
        updateFastestLap(fastestLap.athleteName, fastestLap.lapTime);
    }

    // Example of updating the fastest lap
    setTimeout(function() {
        updateFastestLap('John Doe', '04:30');
    }, 3000);  // This is just an example, you can update it based on your logic
};