let mainContainer = document.getElementById("container");
let secondContainer = document.getElementById("second-container");
let countdownContainer = document.getElementById("countdown-container")
let timeElements = document.querySelectorAll("span");
let titleElement = document.getElementById("countdown-title");
let countdownButton = document.getElementById("countdown-button");

let countdownTitle;
let divNr = 0;

function restrieveLocalItems(div){
    if(localStorage.getItem("countdownStorage")){
        countdownButton.textContent = "Show";
        countdownStorage = JSON.parse(localStorage.getItem('countdownStorage'));
        titleElement.hidden = false;
        countdownTitle = countdownStorage.title;
        titleElement.textContent = countdownTitle;
    }else{
        countdownContainer.hidden = false;
    }
}

function addSavedDivs(){
    if(localStorage.getItem("countdown0")){
        for(i=0; i<=10; i++){
            // Check for each saved countdown div and add it to second container
            let countdown = `countdown${i}`;
            if(localStorage.getItem(countdown)){
                let countdownEl = localStorage.getItem(countdown);
                secondContainer.innerHTML = secondContainer.innerHTML + countdownEl;
            }
        }
    }    
}


function onPlusSign(){
        let newCountdownDiv = document.createElement("div");
        newCountdownDiv.id = 'countdown-container';
        secondContainer.appendChild(newCountdownDiv);

        // Add the title to container 
        let newCountdownTitle = document.createElement("h1");
        newCountdownTitle.id = 'countdown-title';
        newCountdownTitle.textContent = "Test";
        newCountdownDiv.appendChild(newCountdownTitle);
        
        // Add Button to id
        let newButton = document.createElement('button');
        newButton.id = "countdown-button"
        newButton.textContent = "Select";
        newCountdownDiv.appendChild(newButton);
        
        // save div to local storage 
        saveDivToLocalStorage(newCountdownDiv)

        divNr++;
}



function saveDivToLocalStorage(div){
    let countdownDiv = `countdown${divNr}`;
    // Save to local storage
    localStorage.setItem(countdownDiv, div.outerHTML);
}

function removeSavedDivs(){
    localStorage.clear();
}

// onLoad retrieve user countdown
window.onload = (event) => {
    restrieveLocalItems();
    addSavedDivs();
  };