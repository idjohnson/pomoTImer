let timerElement = document.getElementById('timer');
let resetButton = document.getElementById('reset-button');
let alarmAudio = document.getElementById('alarm');
let intervalId = null;
let timerSeconds = 25 * 60; // 25 minutes in seconds

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
        alarmAudio.play();
        timerElement.classList.add('flash');
        setTimeout(() => {
            timerElement.classList.remove('flash');
        }, 1000);
    }
}

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    timerSeconds = 25 * 60;
    displayTime();
});

// Start the countdown
intervalId = setInterval(countdown, 1000);
displayTime();
