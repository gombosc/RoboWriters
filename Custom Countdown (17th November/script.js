const inputContainer = document.getElementById("input-container")
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownTimer = document.getElementById("countdown");
const countdownTimerTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = '';
let countdownDate = '';
let dateUserValue = Date;

// A millisecond is a unit of time in the International System of Units equal to one thousandth of a second and to 1000 microseconds. 
// Standard length of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', today)

// Populate Countdown elements
function updateDOM(){
    let timeNow = new Date().getTime();
    let distance = dateUserValue - timeNow;

    // Calculate countdown elements
    console.log(`Calculate days: distance / day`)
    const days = Math.floor(distance / day);
    con
    const hours = Math.floor( ( distance % day) / hour);
    const minutes = Math.floor( ( distance % hours) / minute);
    const seconds = Math.floor( distance % minutes ) / minutes ;

    // Populate Countdown Elements
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent = seconds;

    // Turn on / off hidden for containers
    inputContainer.hidden = true;
    countdownTimer.hidden = false;
}

// Take values from Form Input
function updateCountdown(e){
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
  
    e.preventDefault();

    // Get number version of current Date, updateDOM
    dateUserValue = new Date(countdownDate).getTime();
    // getTime() returns the number of milliseconds since January 1, 1970 00:00:00.
    console.log("Current Time", dateUserValue);
    updateDOM();
    
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
