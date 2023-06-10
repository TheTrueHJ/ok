Webcam.set({
    width:480,
    height:360,
    img_format: "png",
    png_quality: 90
})

Webcam.attach("#webcam")

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML= "<img src = '" + data_uri + "'>";
    })
}

console.log("ml5 version: " + ml5.version);

classify = ml5.imageClassifier("https://storage.googleapis.com/tm-model/aqMxLUTL8/model.json",ModelLoaded);

function ModelLoaded(){
    img = document.getElementById("snapshot");
    classify.classify(img, gotResult());
}

function speech(){
var synth = webkit.speechSynthesis;
words = "The first prediction is " + result[0].label + " and the second prediction is " + result[1].label + " .";
var utterThis = new SpeechSynthesisUtterance(words);
synth.speak(utterThis);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("Result1").innerHTML = result[0].label;
        document.getElementById("Result2").innerHTML = result[1].label;
        speech();
    }
}