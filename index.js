let mobilenet;
let classifier;
let img;
let mouth, eyes, face, nose = "";

async function setup() {
    mobilenet = ml5.featureExtractor('MobileNet');
    classifier = mobilenet.classification(img, { numLabels: 40 });
    classifier.load(filesOrPath = "https://raw.githubusercontent.com/Whsmith1234/Celebrity/master/model.json", () => {
        input = createFileInput(handleFile);
        document.getElementById("response").innerText="Upload your photo to see!";
    });
    // video.hide();
}
function handleFile(file) {
    if (file.type === 'image') {
        img = createImg(file.data, '');
        predict();
    } else {
        img = null;
    }
}
async function predict() {
    var t = await classifier.classify(img);
    for (var i = 39; i >= 0; i--) {
        var f = t[i].label.split(" ");
        switch (f[f.length - 1]) {
            case "full":
                face= t[i].label.split(",")[2];
                break;
            case "eyes":
                eyes= t[i].label.split(",")[2];
                break;
            case "mouth":
                mouth= t[i].label.split(",")[2];
                break;
            case "nose":
                nose= t[i].label.split(",")[2];
                break;
        }
    }
    document.getElementById("response").innerText=("Overall you have the face of "+face+". With the eyes of "+eyes+", lips of "+mouth+" and nose of "+nose+". You are stunning and don't let anyone tell you otherwise.")
}
