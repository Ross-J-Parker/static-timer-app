let timerInterval;
let startTime;
let lapTimes = [];

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
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

function startLap() {
    startTime = new Date().getTime();
    if (!timerInterval) {
        startTimer(60 * 5, document.querySelector('#time')); // Restart timer if not already running
    }
}

function stopLap() {
    if (startTime) {
        const endTime = new Date().getTime();
        const lapTime = (endTime - startTime) / 1000; // Lap time in seconds
        lapTimes.push(lapTime);
        displayLapTimes();
        updateFastestLap();
        startTime = null;
    }
}

function displayLapTimes() {
    const lapList = document.getElementById('lap-list');
    lapList.innerHTML = ''; // Clear existing lap times
    lapTimes.forEach((lapTime, index) => {
        const lapTimeElement = document.createElement('li');
        lapTimeElement.textContent = `Lap ${index + 1}: ${lapTime.toFixed(2)} seconds`;
        lapList.appendChild(lapTimeElement);
    });
}

function updateFastestLap() {
    if (lapTimes.length > 0) {
        const fastestLapTime = Math.min(...lapTimes);
        const fastestLapIndex = lapTimes.indexOf(fastestLapTime) + 1;
        const fastestLapBanner = document.getElementById('fastest-lap');
        document.getElementById('athlete-name').textContent = `Lap ${fastestLapIndex}`;
        document.getElementById('lap-time').textContent = `${fastestLapTime.toFixed(2)} seconds`;
        fastestLapBanner.style.display = 'flex'; // Show the banner

        // Store the fastest lap information in localStorage
        localStorage.setItem('fastestLap', JSON.stringify({ athleteName: `Lap ${fastestLapIndex}`, lapTime: fastestLapTime.toFixed(2) }));
    }
}

// Initialize the timer when the window loads
window.onload = function () {
    const fiveMinutes = 60 * 5;
    const display = document.querySelector('#time');
    startTimer(fiveMinutes, display);

    // Retrieve the fastest lap information from localStorage
    const fastestLap = JSON.parse(localStorage.getItem('fastestLap'));
    if (fastestLap) {
        document.getElementById('athlete-name').textContent = fastestLap.athleteName;
        document.getElementById('lap-time').textContent = fastestLap.lapTime;
        document.getElementById('fastest-lap').style.display = 'flex';
    }
};
