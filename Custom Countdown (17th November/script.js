// Main Container Elements
const inputContainer = document.getElementById("input-container")
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const hourInput = document.getElementById("hour-picker");

// Countdown Elements
const countdownTimer = document.getElementById("countdown");
const countdownTimerTitle = document.getElementsByClassName("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

// Complete Countdown Elements
const completeContainer = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeButton = document.getElementById("complete-button");

// Global variables
let countdownTitle = '';
let countdownDate = '';
let userHour = '';
let dateUserValue = Date;
let timerRefresher = '';

// A millisecond is a unit of time in the International System of Units equal to one thousandth of a second and to 1000 microseconds. 
// Standard length of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

// Set Date Input Min with Today's Date
const todayDate = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', todayDate);

// Set min hour to be current user hour, refresh every 30 seconds
// var actualTimeInterval = setInterval( () =>{
//     const currentHour = new Date().getHours()
//     currentMinutes = new Date().getMinutes();
//     const currentTime = `${currentHour}:${currentMinutes}`;
//     hourInput.setAttribute('min', currentTime);
// }, 3000);


// Populate Countdown elements
function updateDOM(){
    // clearInterval(actualTimeInterval);

    // Refresh every second with setInterval function
    timerRefresher = setInterval( () => {
        let timeNow = new Date().getTime();
        let distance = dateUserValue - timeNow;

        // Calculate countdown elements
        const days = Math.floor(distance / day);
        const hours = Math.floor( ( distance % day) / hour);
        const minutes = Math.floor( ( distance % hour) / minute);
        const seconds = Math.floor( (distance % minute ) / second);
        
        if (distance < 0){
            completeContainer.hidden = false;
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            clearInterval(timerRefresher);
        } else{
            // Populate Countdown Elements
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            countdownTimerTitle[0].textContent = countdownTitle;

            // Turn on / off hidden for containers
            inputContainer.hidden = true;
            countdownTimer.hidden = false;
        }
    }, second);
}

// Take values from Form Input
function updateCountdown(e){
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    userHour = e.srcElement[2].value;
    e.preventDefault();

    countdownStorage = {
        title: countdownTitle,
        date: countdownDate,
        hour: userHour
    }

    localStorage.setItem("countdownStorage", JSON.stringify(countdownStorage));


    // Get number version of current Date, updateDOM
    dateUserValue = new Date(`${countdownDate}T${userHour}`).getTime();
    // getTime() returns the number of milliseconds since January 1, 1970 00:00:00.
    // console.log("Current Time", dateUserValue);
    if(countdownTitle == 0 || countdownDate == 0 || userHour == 0 ){
        alert("Please choose your date!")
    } else{
        updateDOM();
    }
}

function reset(){
    // Hide Countdown, show main container
    inputContainer.hidden = false;
    countdownTimer.hidden = true;
    completeContainer.hidden = true;

    // Stop the setInterval
    window.clearInterval(timerRefresher);

    // Reset Timer Elements
    countdownTitle = "";
    countdownDate = "";
    userHour = "";
    completeInfo.textContent = "";
    countdownForm.reset();
    localStorage.removeItem("countdownStorage");
}

function restoreLocalItems(){
    if(localStorage.getItem("countdownStorage")){
        countdownStorage = JSON.parse(localStorage.getItem('countdownStorage'));
        countdownTitle = countdownStorage.title;
        countdownDate = countdownStorage.date;
        userHour = countdownStorage.hour;
        dateUserValue = new Date(`${countdownDate}T${userHour}`).getTime();
        inputContainer.hidden = true;
        countdownTimer.hidden = false;
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", reset);
completeButton.addEventListener("click", reset);

// On Load, restore local storage items
restoreLocalItems();
