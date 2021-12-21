song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Debug: pose.net has been initialised. Line-10");
}
function draw() {
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 & rightWristY <= 100) {
        document.getElementById("speech").innerHTML="Speed: 0.5 x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <=200) {
        document.getElementById("speed").innerHTML = "Speed: 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <=300) {
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <=400) {
        document.getElementById("speed").innerHTML = "Speed: 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <=500) {
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
        song.rate(2.5);
    }
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 0);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
}
function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(2);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x ="+leftWristX);
        console.log("left wrist y ="+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x ="+rightWristX);
        console.log("right wrist y ="+rightWristY);
    }
}