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

const tracks = [
    {
        name: 'jacinto-1',
        songName: "Beauty Land",
        artistName: "Maneskin",
    },

    {
        name: 'jacinto-2',
        songName: "Snakes",
        artistName: "Russ",
    },

    {
        name: 'jacinto-3',
        songName: "Money Game",
        artistName: "Ren",
    },
    {
        name: 'jacinto-4',
        songName: "Lil Dicky",
        artistName: "Westbrook",
    }
]

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

function loadSong(track){
    artist.textContent = track.artistName;
    song.textContent = track.songName;
    music.src = `music/${track.name}.mp3`;
    image.src = `img/${track.name}.jpg`;
}

function nextSong(){
    songIndex++;

    if(songIndex > tracks.length - 1){
        songIndex = 0;
    }

    loadSong(tracks[songIndex]);
    playMusic();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = tracks.length - 1;
    }

    loadSong(tracks[songIndex]);
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

loadSong(tracks[songIndex]);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgressBar)
music.addEventListener("ended", nextSong)
