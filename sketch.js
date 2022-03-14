var newImageurl = 1;
var labels = ["full", "eyes", "mouth", "nose"];
var images = [];
var predictions = [];
var celebs =[];
let video;
let x = 0;
let facemesh;
let mobilenet;
let classifier;
let h;
let celeb =25;
let examples;
var flick = 0;
var start = false;
async function setup() {
  await getCelebs();
  start=true;
  frameRate(30);
  createCanvas(400, 400);
  // video = createCapture(VIDEO);
  //  video.size(width, height);

  mobilenet = ml5.featureExtractor('MobileNet');
  classifier = mobilenet.classification(h,{numLabels:40});
  h = createImg(canvas.toDataURL());
  examples = [];
  console.log(celebs[1]);
  h.elt.src = "https://th.bing.com/th?q="+celebs[celeb].split(",")[2]+"+1&w=400&h=400&c=7&rs=1&p=0&o=5&dpr=1.25&pid=1.7&mkt=en-CA&cc=CA&setlang=en&adlt=moderate&t=2"
  facemesh = ml5.facemesh(video, {}, loaded);
  h.hide();
  // video.hide();
}
var newFace = 0;
var counter = 0;
let high = {};
let bottom = {};
let left = {};
let right = {};
function draw() {
  if(newImageurl==10){
    celeb++;
    newImageurl = 0;
    console.log(celeb)
  }
  if(newImageurl < 10&&start==true&&celeb<37){
  background(0);
  image(h, 0, 0)
  try {
    facemesh.predict(h, results => {
      if (predictions != results) {
        predictions = results;
        newFace++;
      }
    });
  } catch {
    
  }
if(predictions.length==0){
  if(x==0){

  }else{
    newImageurl ++;
    h.elt.src = "https://th.bing.com/th?q="+celebs[celeb].split(",")[2]+ "+"+newImageurl + "+person&w=400&h=400&c=7&rs=1&p=0&o=5&dpr=1.25&pid=1.7&mkt=en-CA&cc=CA&setlang=en&adlt=moderate&t=2";
  }
}
  if (predictions.length > 0 &&newFace>3) {
    var t = predictions[0].annotations.silhouette[0];


    high.y = t[1];
    high.x = t[0];
    t = predictions[0].annotations.silhouette[9]
    right.y = t[1];
    right.x = t[0];
    t = predictions[0].annotations.silhouette[18]


    bottom.y = t[1];
    bottom.x = t[0];

    t = predictions[0].annotations.silhouette[27]

    left.y = t[1];
    left.x = t[0];


      var box = predictions[0].boundingBox;
      var face = predictions[0].annotations;
      noStroke();
      fill(140, 230, 60, 125);

      images[0] = get(box.topLeft[0][0], box.topLeft[0][1], box.bottomRight[0][0] - box.topLeft[0][0], box.bottomRight[0][1] - box.topLeft[0][1])
      //eyes
      var x1 = face.rightEyeUpper0[0][0] - 10;
      var y = face.rightEyebrowUpper[0][1] - 10;
      var width1 = Math.abs(face.leftEyeUpper0[0][0] - face.rightEyeUpper0[0][0]) + 20;
      var height1 = Math.abs(face.leftEyebrowUpper[1][1] - face.leftEyeLower0[1][1]) + 20;
      images[1] = get(x1, y, width1, height1)
      //mouth
      images[2] = get(left.x, face.noseBottom[0][1] - 5, Math.abs(left.x - right.x), bottom.y - face.noseBottom[0][1] + 5)

      images[3] = get(x1 + width1 / 3, y, width1 / 3, face.noseBottom[0][1] - 5 - y)

    
    if (counter < images.length) {
      flick++;
      background(0);
      image(images[counter], 0, 0,width,height);
      var t = canvas.toDataURL();
      console.log("new")
      
      if(flick%2==1){
        examples[x] = createImg(t);
        classifier.addImage(examples[x],celebs[celeb]+" "+labels[counter]);
        counter++;
        examples[x].remove();
        x++;
      }
     

      if (counter == 4) {
        pastPrediction = predictions;
      }
    } else {
      counter = 0;

      
      if (newFace > 5) {
        newImageurl++;
        h.elt.src = "https://th.bing.com/th?q="+celebs[celeb].split(",")[2]+ "+"+newImageurl + "+person&w=400&h=400&c=7&rs=1&p=0&o=5&dpr=1.25&pid=1.7&mkt=en-CA&cc=CA&setlang=en&adlt=moderate&t=2";
        newFace = 0;
      }
    }
  }


  //classifier.addImage("will");
}
}

function loaded() {
}
//
async function getCelebs(){
  var content = await fetch("https://gist.githubusercontent.com/mbejda/9c3353780270e7298763/raw/1bfc4810db4240d85947e6aef85fcae71f475493/Top-1000-Celebrity-Twitter-Accounts.csv");
  content = await content.text();
  content = content.split("\n");
  celebs = content;
  celebs[32] = celebs[3];
}