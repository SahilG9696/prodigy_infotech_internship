let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCount = 1;

const display = document.querySelector(".display");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsContainer = document.querySelector(".laps");

function updateDisplay() {
    let formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
    display.textContent = formattedTime;
}

function startPause() {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);

        startPauseBtn.textContent = "Pause";
        startPauseBtn.style.background = "orange";
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        startPauseBtn.style.background = "green";
        isRunning = false;
    }
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
        lapCount++;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 1;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    startPauseBtn.style.background = "green";
    lapsContainer.innerHTML = "";
}

startPauseBtn.addEventListener("click", startPause);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);

// Initialize display
updateDisplay();
