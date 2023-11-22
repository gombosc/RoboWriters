let mainContainer = document.getElementById("container");
let secondContainer = document.getElementById("second-container");
let countdownContainer = document.getElementById("countdown-container")
let timeElements = document.querySelectorAll("span");
let titleElement = document.getElementById("countdown-title");
let countdownButton = document.getElementById("countdown-button");
let removeButton = document.getElementById("remove-button");
let divPlusIcon = document.getElementById("plusIcon");

let countdownTitle;
// Set div names numerical based on created order
let divNr = 0;

function restrieveLocalItems(){
    if(localStorage.getItem("countdownStorage")){
        divPlusIcon.hidden = false;
        removeButton.hidden = false;
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
    for(i=0; i<=10; i++){
        if(localStorage.getItem(`countdown${i}`)){
            // Check for each saved countdown div and add it to second container
            let countdown = `countdown${i}`;
            let countdownDiv = localStorage.getItem(countdown);
            secondContainer.innerHTML = secondContainer.innerHTML + countdownDiv;
        }
    }    
}


function onPlusSign(){
        
        let newCountdownDiv = document.createElement("div");
        newCountdownDiv.id = 'countdown-container';
        newCountdownDiv.classList = `${divNr}`;
        secondContainer.appendChild(newCountdownDiv);

        // Add the title to container 
        let newCountdownTitle = document.createElement("h1");
        newCountdownTitle.id = 'countdown-title';
        newCountdownTitle.textContent = "Test";
        newCountdownDiv.appendChild(newCountdownTitle);

        // Add button container
        let buttonContainer = document.createElement("div");
        buttonContainer.id = 'button-container';
        
        // Add Show Button
        let newButton = document.createElement('button');
        newButton.id = "countdown-button"
        newButton.textContent = "Show";
        buttonContainer.appendChild(newButton);

        // Add remove button
        let newButton2 = document.createElement('button');
        newButton2.id = "countdown-button"
        newButton2.textContent = "Remove";
        newButton2.setAttribute('onClick', `remove(this.parentElement.parentElement)`);
        buttonContainer.appendChild(newButton2);

        // Append button container to main container
        newCountdownDiv.appendChild(buttonContainer);
        
        // save div to local storage 
        saveDivToLocalStorage(newCountdownDiv);
        divNr++;
        localStorage.setItem('divNr', JSON.stringify(divNr));
        
        
        
       
}

function saveDivToLocalStorage(div){
    let countdownDiv = `countdown${divNr}`;
    // Save to local storage
    localStorage.setItem(countdownDiv, div.outerHTML);
}

function removeSavedDivs(){
    localStorage.clear();
    location.reload()
}

function remove(e){
    let element = e;
    let divClassNr = element.classList[0];
    element.remove();
    if(!divNr<=0 ){
        divNr--;
        localStorage.setItem('divNr', JSON.stringify(divNr));
    }
    localStorage.removeItem(`countdown${divClassNr}`);
}

// onLoad retrieve user countdown
window.onload = (event) => {
    if(localStorage.getItem('divNr')){
        divNr = JSON.parse(localStorage.getItem('divNr'));
    }
    restrieveLocalItems();
    addSavedDivs();
  };