//Global VAriables

let width = 500,
    height = 0,
 streaming = false;
imgArray = [];   
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');

// get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
.then(function(stream) {
  video.srcObject = stream;
  video.play();
})
 .catch(function (err) {
  console.log(`Error: ${err}`);
 })

 // Play when ready
 video.addEventListener('canplay', function(e) {
  if(!streaming) {
    // Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

// Photo button event
photoButton.addEventListener('click', function(e) {
  takePicture();

  e.preventDefault();
}, false);

// Clear Event
clearButton.addEventListener('click', function (e) {
 photos.innerHTML = '';
})
// Take picture from canvas
function takePicture() {
 // Create canvas
 const context = canvas.getContext('2d');
 if (width && height) {
  // set canvas props
  canvas.width = width;
  canvas.height = height;
  // Draw an image of the video on the canvas
  context.drawImage(video, 0, 0, width, height);

  // Create image from the canvas
  const imgUrl = canvas.toDataURL('image/png');
  // console.log(imgUrl);
  // Create img element and src
  const img = document.createElement('img');
  img.setAttribute('src', imgUrl);
  // console.log(img);
  // Add image to photos
   imgArray = photos.appendChild(img);
   
   console.log(imgArray)
 
 }
}

/* function getPicture(img) {
  imgArray.push(img)
}
 */