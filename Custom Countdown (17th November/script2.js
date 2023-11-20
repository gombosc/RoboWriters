let countdownContainer = document.getElementById("countdown-container")
let timeElements = document.querySelectorAll("span");
let titleElement = document.getElementById("countdown-title");

let countdownTitle;

function restrieveLocalItems(){
    if(localStorage.getItem("countdownStorage")){
        countdownStorage = JSON.parse(localStorage.getItem('countdownStorage'));
        titleElement.hidden = false;
        countdownTitle = countdownStorage.title;
        titleElement.textContent = countdownTitle;
        // countdownDate = countdownStorage.date;
        // userHour = countdownStorage.hour;
        // dateUserValue = new Date(`${countdownDate}T${userHour}`).getTime();
        // inputContainer.hidden = true;
        // countdownTimer.hidden = false;
    }else{
        countdownContainer.hidden = false;
    }
}

function updateDOM(){
    
}

// onLoad retrieve user countdown
restrieveLocalItems();