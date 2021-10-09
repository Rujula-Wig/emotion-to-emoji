prediction1="";
prediction2="";
Webcam.set({
    width: 350,
    height:300,
Image_format:'png',
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GsPbWx5D8/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if (results[0].label=="happy") {
      document.getElementById("update_emoji").innerHTML="&#128522;";
    }
    if (results[0].label=="sad") {
        document.getElementById("update_emoji").innerHTML="&#128532;";
    }
    if (results[0].label=="angry") {
        document.getElementById("update_emoji").innerHTML="&#128548;";
    }
    if (results[1].label=="happy") {
        document.getElementById("update_emoji").innerHTML="&#128522;";
      }
      if (results[1].label=="sad") {
          document.getElementById("update_emoji").innerHTML="&#128532;";
      }
      if (results[1].label=="angry") {
          document.getElementById("update_emoji").innerHTML="&#128548;";
      }      
}
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="First Prediction is"+prediction1;
    speak_data_2="Second Prediction is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterthis);}