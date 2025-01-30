let timerElement = document.getElementById('timer');
let resetButton = document.getElementById('reset-button');
let startStopButton = document.getElementById('start-stop-button');
let canvas = document.getElementById('equalizer');
let ctx = canvas.getContext('2d');
let intervalId = null;
let timerSeconds = 25 * 60; // 25 minutes in seconds
let isRunning = false;

// Equalizer bars
const bars = 10;
const barWidth = canvas.width / bars;
let animationId;

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
        // Animate end
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
    // Add some visual feedback when starting
    timerElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        timerElement.style.transform = 'scale(1)';
    }, 200);
}

function animateEnd() {
    // Add some visual feedback when ending
    timerElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        timerElement.style.transform = 'scale(1)';
    }, 200);
}

function drawEqualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * canvas.height;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
    }
    
    animationId = requestAnimationFrame(drawEqualizer);
}

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = "Start";
    timerSeconds = 25 * 60;
    displayTime();
});

startStopButton.addEventListener('click', toggleTimer);

// Initialize the display and equalizer
displayTime();
drawEqualizer();

// Cleanup
window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
});