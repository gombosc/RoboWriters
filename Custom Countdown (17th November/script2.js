let mainContainer = document.getElementById("container");
let secondContainer = document.getElementById("second-container");
let countdownContainer = document.getElementById("countdown-container")
let timeElements = document.querySelectorAll("span");
let titleElement = document.getElementById("countdown-title");
let countdownButton = document.getElementById("countdown-button");
let removeButton = document.getElementById("remove-button");
let divPlusIcon = document.getElementById("plusIcon");
// Updade on load with each new container
let allCountdownContainers = document.querySelectorAll("#countdown-container");

let countdownKeyMain = 0;
let countdownTitle;
// Set div names numerical based on created order
let divNr = 0;

function onShowButton(e){
    let element = e.classList[0];
    localStorage.setItem("mainPageKey", JSON.stringify(element));
    window.location.href = "countdown.html"
}

function updateDivElements(){
    for(i=0; i<=allCountdownContainers.length-1; i++){
        let timeElements = JSON.parse(localStorage.getItem(`timeStorage${i}`));
        let countdownDiv = allCountdownContainers[i];
        countdownDiv.style.display = 'flex';

        let localCoundown = `countdownStorage${countdownDiv.classList[0]}`
        let titleElement = countdownDiv.children[0];
        titleElement.hidden = false;
        
        // Get buttons 
        let createButton = countdownDiv.querySelector('div').children[0];
        let removeButton = countdownDiv.querySelector('div').children[1];

        // Update day and hour elements
        countdownDiv.children[1].hidden = false;
        let l1 = countdownDiv.children[1].querySelectorAll('li')[0]
        let l2 = countdownDiv.children[1].querySelectorAll('li')[1]

        if(localStorage.getItem(localCoundown)){
            let data = JSON.parse(localStorage.getItem(localCoundown))
            createButton.textContent = 'Show';
            removeButton.hidden = false;
            removeButton.textContent = 'Remove';
            titleElement.textContent = data.title;

            l1.textContent = `${timeElements.days} Days`;
            l2.textContent = `${timeElements.hours} Hours`;
        }else{
            remove(countdownDiv);
        }
    }
}

function restrieveLocalItems(){
    updateDivElements();
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
        window.location.href = 'countdown.html'
        let newCountdownDiv = document.createElement("div");
        newCountdownDiv.id = 'countdown-container';
        newCountdownDiv.classList = `${divNr}`;
        secondContainer.appendChild(newCountdownDiv);

        // Add the title to container 
        let newCountdownTitle = document.createElement("h1");
        newCountdownTitle.id = 'countdown-title';
        newCountdownTitle.hidden = true;
        newCountdownDiv.appendChild(newCountdownTitle);

        // Create Time Elements
        let ulElement = document.createElement('ul');
        let dayElem = document.createElement('li');
        dayElem.textContent = 'Days';
        ulElement.appendChild(dayElem);

        let hourElem = document.createElement('li');
        hourElem.textContent = 'Hours';
        ulElement.appendChild(hourElem);
        newCountdownDiv.appendChild(ulElement)
        ulElement.hidden = true;

        // Add button container
        let buttonContainer = document.createElement("div");
        buttonContainer.id = 'button-container';
        
        // Add Show Button
        let newButton = document.createElement('button');
        newButton.id = "countdown-button"
        newButton.textContent = "Create";
        newButton.setAttribute("onclick", "onShowButton(this.parentElement.parentElement)");
        buttonContainer.appendChild(newButton);

        // Add remove button
        let newButton2 = document.createElement('button');
        newButton2.id = "countdown-button"
        newButton2.hidden = true;
        newButton2.setAttribute('onClick', `remove(this.parentElement.parentElement)`);
        buttonContainer.appendChild(newButton2);

        // Append button container to main container
        newCountdownDiv.appendChild(buttonContainer);      
        // save div to local storage 
        saveDivToLocalStorage(newCountdownDiv);
        divNr++;
        localStorage.setItem('divNr', JSON.stringify(divNr));
        
        // Update the number of containers
        allCountdownContainers = document.querySelectorAll(`#countdown-container`);
        
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

    let countdownNr = JSON.parse(localStorage.getItem("countdownNr"))
    if(countdownNr != 0){
        countdownNr--;
        localStorage.setItem('countdownNr', JSON.stringify(countdownNr));
    }
   
    

    if(localStorage.getItem(`countdownStorage${divClassNr}`)){
        localStorage.removeItem(`countdownStorage${divClassNr}`);
        localStorage.removeItem(`timeStorage${divClassNr}`);
    }

    allCountdownContainers = document.querySelectorAll(`#countdown-container`);
}

// onLoad retrieve user countdown
window.onload = () => {
    // Check for divNr in local storage
    if(localStorage.getItem('divNr')){
        divNr = JSON.parse(localStorage.getItem('divNr'));
    }
    
    if(localStorage.getItem('countdownNr')){
        countdownKeyMain = JSON.parse(localStorage.getItem('countdownKey'))
    }

    // On load if the countdown was reset, delete the div from main page
    addSavedDivs();
    // This loads first, so if you want to have all divs position after the loading of the containers, dah...
    allCountdownContainers = document.querySelectorAll(`#countdown-container`);
    restrieveLocalItems();
    
  };