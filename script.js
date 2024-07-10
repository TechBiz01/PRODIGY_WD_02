const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapClearButton = document.getElementsByClassName("lap-clear-button")[0];
const lapsContainer = document.getElementsByClassName("laps")[0];

let isPlay = false;
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let sec;
let centiSec;

const toggleButton = () => {
    lapButton.classList.toggle("hidden");
    resetButton.classList.toggle("hidden");
    lapClearButton.classList.toggle("hidden");
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        sec = setInterval(() => {
            if (secCounter >= 60) {
                secCounter = 0;
                minCounter++;
                minute.innerText = `${minCounter < 10 ? '0' : ''}${minCounter} :`;
            }
            second.innerText = `${secCounter < 10 ? '0' : ''}${secCounter++} :`;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter >= 100) {
                centiCounter = 0;
            }
            centiSecond.innerText = `${centiCounter < 10 ? '0' : ''}${centiCounter++}`;
        }, 10);
        isPlay = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
    }
    toggleButton();
};

const reset = () => {
    playButton.innerHTML = 'Play';
    clearInterval(sec);
    clearInterval(centiSec);
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    minute.innerText = '00 :';
    second.innerText = '00 :';
    centiSecond.innerText = '00';
    toggleButton();
};

const addLap = () => {
    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `<span class="number">#${lapsContainer.children.length}</span><span class="timestamp"> ${minute.innerText}${second.innerText}${centiSecond.innerText}</span>`;
    lapsContainer.insertBefore(lapItem, lapClearButton);
};

const clearLaps = () => {
    while (lapsContainer.firstChild && lapsContainer.firstChild !== lapClearButton) {
        lapsContainer.removeChild(lapsContainer.firstChild);
    }
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
lapClearButton.addEventListener("click", clearLaps);
