var video = document.getElementById("vid");
 
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/img/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/img/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/img/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/img/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

 
//function startVideo(){
//     navigator.mediaDevices.getUserMedia({
//
//        video:{
//            width: 1280, 
//            height: 720
//        } 
//
//    })
//    .then(stream => {video.srcObject = stream})   
//}

//function startVideo(){
//    navigator.getUserMedia = (navigator.getUserMedia ||
//                             navigator.webkitGetUserMedia ||
//                             navigator.mozGetUserMedia ||
//                             navigator.msGetUserMedia);
//    
//    navigator.getUserMedia(
//    { video: {}},
//        stream => video.srcObject = stream,
//        err => console.log(err)
//    ) 
//} 
//
//Promise.all([
//    faceapi.nets.tinyFaceDetector.loadFromUri('/img/models'),
//    faceapi.nets.faceLandmark68Net.loadFromUri('/img/models'),
//    faceapi.nets.faceRecognitionNet.loadFromUri('/img/models'),
//    faceapi.nets.faceExpressionNet.loadFromUri('/img/models'),
//    faceapi.nets.ageGenderNet.loadFromUri('/img/models')
//]).then(startVideo);
//
//video.addEventListener('play', async () => {
//    const canvas = faceapi.createCanvasFromMedia(video);
//    document.body.append(canvas);
//    
//    const displaySize = { width: video.width, height: video.height};
//    faceapi.matchDimensions(canvas, displaySize);
//    setInterval(async () => {
//        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
//        const resizedDetections = faceapi.resizeResults(detections, displaySize);
//      
//    }, 100);
//});

