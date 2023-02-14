const quote = document.getElementById('quote')
const author = document.getElementById('author')
const button = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');
const container = document.getElementById('quote-container')


let apiQuotes =[];

// Loader
function loading(){
    loader.hidden = false;
    container.hidden = true;
}

// Loader
function loadingComplete(){
    loader.hidden = true;
    container.hidden = false;
}

function newQuote(){
    loading();
    const quote1 = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote1)
     if(!quote.author == ''){
        author.textContent = 'Unknown';
     }else{
        author.textContent = quote1.author
     }
     if(quote1.text.length >= 50){
        quote.classList.add('long-quote');
     }else{
        quote.classList.remove('long-quote');
     }
     quote.textContent = quote1.text;
     loadingComplete();
 }

//  --------- Search for difference between innerHtml and textContent

// Get Quotes from API
async function getQuotes(){
    loading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        alert(error);
    }
}


// Replace quote with a random one each time a button is pressed


function replaceQuote(){
    random = Math.floor(Math.random() * apiQuotes.length)
    quote.textContent = apiQuotes[random].text;
    author.textContent = apiQuotes[random].author;
}

getQuotes();


// Post to Twitter
function twitterPost(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}


button.addEventListener('click', replaceQuote);
twitterButton.addEventListener('click', twitterPost);


