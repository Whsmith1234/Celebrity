// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with poseNet. Built with p5.js
=== */
let video;
var predictions = [];
let x = 0;
let img;
let facemesh;
let mobilenet;
let classifier;
let eye;
let h;
function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');
  video = createCapture(VIDEO);
  video.size(width, height);
  img = createImage(10, 10);
  facemesh = ml5.facemesh(video);
  mobilenet = ml5.featureExtractor('MobileNet');
  classifier = mobilenet.classification(h);
// Listen to new 'face' events
facemesh.on('face', results => {
  predictions = results;
  if(x==0) console.log(predictions,Object.keys(predictions[0]));
  x++;
});

  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {  
  image(video, 0, 0, width, height);
  image(img,0,0);
  for(var i =0;i<predictions.length;i++){
    for(var j =0;j<35;j++){
      var t = predictions[i].annotations.silhouette[j];
      ellipse(t[0],t[1],2,2);
    }
    if(x>0){
    eye = (get(predictions[i].annotations.leftEyeUpper0[0][0]-40,predictions[i].annotations.leftEyeUpper0[0][1]-10,40,40));
    image(eye,0,0,width,height);
    eye = canvas.toDataURL();
    }
  }
  //classifier.addImage("will");
}
function test(){
  h = createImg(eye).hide()
  classifier.addImage(h,"a");
}