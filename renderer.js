let timerElement = document.getElementById('timer');
let resetButton = document.getElementById('reset-button');
let startStopButton = document.getElementById('start-stop-button');
let alarmAudio = document.getElementById('alarm');
let intervalId = null;
let timerSeconds = 25 * 60; // 25 minutes in seconds
let isRunning = false;

function displayTime() {
    let minutes = Math.floor(timerSeconds / 60);
    let seconds = timerSeconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function countdown() {
    timerSeconds--;
    displayTime();
    
    if (timerSeconds <= 0) {
        clearInterval(intervalId);
        isRunning = false;
        startStopButton.textContent = "Start";
        alarmAudio.play();
        timerElement.classList.add('flash');
        setTimeout(() => {
            timerElement.classList.remove('flash');
        }, 1000);
    }
}

function toggleTimer() {
    if (!isRunning) {
        isRunning = true;
        startStopButton.textContent = "Stop";
        intervalId = setInterval(countdown, 1000);
    } else {
        isRunning = false;
        startStopButton.textContent = "Start";
        clearInterval(intervalId);
    }
}

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = "Start";
    timerSeconds = 25 * 60;
    displayTime();
});

startStopButton.addEventListener('click', toggleTimer);

// Initialize the display
displayTime();
