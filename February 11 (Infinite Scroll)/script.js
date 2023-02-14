// DOM variables
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// API variables
let count = 5;
const ApiKey ='V5LjVvG9xOFlPJYsoAgXv5qUpdSrlVXWugfe8sVHXew';
const SecretKey ='p18wvgwrjqhPwHJhjTNBBNxH-f3Jboht7KWHwq2GKvk'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`
let photosArray = [];

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Initial Load
let InitialLoad = true;

function updateApiCount(newCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${newCount}`;
}

function imageLoaded(){
    console.log('Image loaded: ' + imagesLoaded)
    imagesLoaded++;
    if (imagesLoaded == totalImages){
        ready = true;
        console.log(ready)
        loader.hidden = true;
        count = 10;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes)
    element.setAttribute(key, attributes[key]);
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("Total Images = " + totalImages);
    photosArray.forEach( photo => {
        // Create <a> element to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular); ---- not a good DRY
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description)

        setAttributes(img, {   
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Check if image loaded
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> and then both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function fetchImagesfromUnsplash(){
    try{
        const response = await fetch(apiUrl); 
        photosArray = await response.json();
        displayPhotos();

        // if(InitialLoad){
        //     console.log('It works' )
        //     count = 10;
        //     updateApiCount(count);
        //     InitialLoad = false;
        // }
    }catch (error){
        console.log(error);
        alert(error)
        // Show error report
    }
}

// Infinite Scroll, check to see if scrolling near bottom of page and then load more photos
window.addEventListener("scroll", ()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    // console.log(`ScrollY: `+ window.scrollY)
    // console.log(`Window Height:`+ window.innerHeight)
    ready = false;
    displayPhotos();
    console.log('loaded more')}
})

fetchImagesfromUnsplash();