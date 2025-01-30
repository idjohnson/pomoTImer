// renderer.js (updated)
let timerElement = document.getElementById('timer');
let resetButton = document.getElementById('reset-button');
let startStopButton = document.getElementById('start-stop-button');
let progressElement = document.getElementById('progress');
let intervalId = null;
let timerSeconds = 25 * 60; // 25 minutes in seconds
let isRunning = false;

function displayTime() {
    let minutes = Math.floor(timerSeconds / 60);
    let seconds = timerSeconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const percentage = (25 * 60 - timerSeconds) / (25 * 60) * 100;
    progressElement.style.width = `${percentage}%`;
}

function countdown() {
    timerSeconds--;
    displayTime();
    updateProgress();
    
    if (timerSeconds <= 0) {
        clearInterval(intervalId);
        isRunning = false;
        startStopButton.textContent = "Start";
        animateEnd();
    }
}

function toggleTimer() {
    if (!isRunning) {
        isRunning = true;
        startStopButton.textContent = "Stop";
        intervalId = setInterval(countdown, 1000);
        animateStart();
    } else {
        isRunning = false;
        startStopButton.textContent = "Start";
        clearInterval(intervalId);
    }
}

function animateStart() {
    timerElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        timerElement.style.transform = 'scale(1)';
    }, 200);
}

function animateEnd() {
    timerElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        timerElement.style.transform = 'scale(1)';
    }, 200);
}

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = "Start";
    timerSeconds = 25 * 60;
    displayTime();
    progressElement.style.width = '0%';
});

startStopButton.addEventListener('click', toggleTimer);

// Initialize the display
displayTime();

// ... existing code...
