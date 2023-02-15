const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element then play
async function selectMediaStream(){
    try{
         mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        // Play video once everything is loaded
        videoElement.onloadedmetadata = () =>
        {
            videoElement.play();
        }
    
    } catch(error){
        console.log("Error: " + error)
    }
}

button.addEventListener('click', async () => 
{
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    button.addEventListener('click', () => {
       document.exitPictureInPicture();
    })
})


// On Load
selectMediaStream();

// Doesn't work on firefox