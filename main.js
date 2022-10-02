var stroke_w = 5;
var color_stroke = "black";

function preload(){
classifier=ml5.imageClassifier("DoodleNet");
}

function setup(){
canvas=createCanvas(350,350);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis;

stroke_w="";
}

function draw(){
strokeWeight(stroke_w);
stroke(color_stroke);
if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
}
}

function clearCanvas(){
background("white");
}

function classifyCanvas(){
    console.log("Classify");
    classifier.classify(canvas,gotResult)
}


function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML="Label: "+results[0].label;
        document.getElementById("confidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+" %"
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}


function weight(){
    stroke_w=document.getElementById("stroke_weight").value;
    color_stroke=document.getElementById("color").value;
}
