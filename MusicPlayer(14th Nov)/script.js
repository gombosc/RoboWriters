const image = document.querySelector("img");

const song = document.getElementById("song");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// const tracks = [
//     {
//         name: 'jcole',
//         songName: "Free Remix",
//         artistName: "J.Cole",
//     },

//     {
//         name: 'mtjoy',
//         songName: "Silver Lining",
//         artistName: "Mt. Joy",
//     },

//     {
//         name: 'drake',
//         songName: "Laugh Now Cry Later",
//         artistName: "Drake",
//     },
//     {
//         name: 'kanye',
//         songName: "Good Morning",
//         artistName: "Kanye West",
//     },
//     {
//         name: 'ryofukui',
//         songName: "Scenery",
//         artistName: "Ryo Fukui",
//     },
//     {
//         name: 'jcole2',
//         songName: "Apparently",
//         artistName: "J.Cole",
//     }
// ]

let songKeys;
let songValues;

async function fetchTracks(){
    try {
        const response = await fetch('tracks.json');
        const data = await response.json();
        songValues = Object.values(data);
        songKeys = Object.keys(data);
        return data;
    } catch (error){
        console.error('Error fetching tracks', error);
        return null;
    }
}


// Function for play / pause

let isPlaying = false;


function playMusic(){
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener("click", () => {
    isPlaying?pauseMusic(): playMusic();
})


// Current Song 
let songIndex = 0;

async function loadSong(trackNumber){  
    if(songValues && songValues[trackNumber]) {
        artist.textContent = songValues[trackNumber].artist;
        song.textContent = songValues[trackNumber].songName;
        music.src = `music/${songValues[trackNumber].name}.mp3`;
        image.src = `img/${songValues[trackNumber].name}.png`;
    } else {
        console.error(`Track not found: ${trackNumber}`);
    }
    
}

function nextSong(){
    songIndex++;

    if(songIndex > songKeys.length - 1){
        songIndex = 0;
    }

    loadSong(songIndex);
    playMusic();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songKeys.length - 1;
    }

    loadSong(songIndex);
    playMusic();
}

function updateProgress(e){
    if(isPlaying){
        const {currentTime, duration} = e.srcElement
        // Update progress bar
        let progressTime = (currentTime / duration) *100;
        progress.style.width = `${progressTime}%`;

        // Calculate song duration
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        if(seconds < 10){
            seconds = `0${seconds}`;
        }
        // Update song time for each track
        if(seconds){
            durationEl.textContent = `${minutes}:${seconds}`;
        }
        
        // Calculate song current time
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentMinutes < 10){
            currentMinutes = `0${currentMinutes}`;
        }
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        // Update song time for each track
        if(currentSeconds){
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
        
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    let clickX = e.offsetX;

    const {duration} = music;
    music.currentTime = (clickX / width) *duration;
    playMusic();
}


fetchTracks();
// Basic Playing Function - wait for the async fetch function to complete then load song, otherwise first one doesn't show up correctlgity
setTimeout( () => {
    loadSong(songIndex);
} , 500);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Progress bar and selecting time
music.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgressBar)
music.addEventListener("ended", nextSong)
