/**
 * WCC1 Final Project
 * Thi Dieu Huong Vu
 * Stand 60cm from the screen, pray and bow down to the screen
 */
let prayIsTrue;
let y = 60;
let r = 30;
let bubbles = [];
let video;
let poseNet;
let currentPoses = [];
const poseNetOptions = { detectionType: "single"};

function preload(){
  bunny =  loadModel('body.obj');
  face = loadModel('face.obj');
  lotus = loadModel('lotus.obj');
  ceiling = loadModel('ceiling.obj');
  smallbunny = loadModel('smallbunny.obj');
  texture2 = loadImage ('texture2.png');
  texture3 = loadImage('texture3.png');
  
}

function setup() {
  createCanvas(900, 1250, WEBGL);
  angleMode(DEGREES);
  noStroke();
  cam = createCamera();
  noLoop();
  
  prayIsTrue = false;
  textureWrap(CLAMP);
  
  for(let i = 0; i < 20; i++) {
    bubbles[i] = new p5.Vector(random(-300, 300), random(height), random(-70, 70));
  }
  
  // Posenet
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Setup PoseNet
  poseNet = ml5.poseNet(video, poseNetOptions, onPoseNetModelReady);
  poseNet.on('pose', onPoseDetected);
}

function onPoseNetModelReady() {
  print("The PoseNet model is ready...");
}

function onPoseDetected(poses) {
  currentPoses = poses;
}

function draw() {
  // Redraw
  scale(1.2); // Scale the entire scene
  background(220);
  
  // Background
  rotateX(-10); // Rotate the entire scene
  drawBackground();
  
  // Bunny
  push();
  translate(0, 100, 0);
  drawBunny();
  pop();
  
  // Lotus
  drawLotus();
  
  // Set The Scene
  loop();
  orbitControl(2, 1, 0.1);
  specularMaterial(250);
  shininess(200);

  // Fullscreen Button 
  button = createImg('ava.png', 'avatar');
  button.position(width/2-40, height-150);
  button.size(80, 120);
  button.mousePressed(gofullscreen);
  
  if(prayIsTrue){
    drawBubble();
  } 
  
  // Posenet
  drawKeypoints(-100, -100);
  drawSkeleton();
}

function drawBackground(){
  // Ceiling Top
  push();
  translate(0, -400, 0);
  texture(texture3);
  rotateY(180);
  pop();
  
  // Ceiling Decoration 1
  push();
  translate(213, -190, 0);
  texture(texture3);
  rotateX(45);
  sphere(20);
  rotateX(r);
  rotateY(r)
  circle(0, 0, 60);
  pop();
  
  // Ceiling Decoration 2
  push();
  translate(-213, -190, 0);
  texture(texture3);
  rotateX(45);
  sphere(20);
  rotateX(-r);
  rotateY(-r)
  circle(0, 0, 60);
  pop();
  
  // Rolling Circle
  push();
  texture(texture2);
  translate(0, -70, -70);
  rotateZ(r);
  circle(0, 0, 430);
  pop();
}

function drawBunny(){
  push();
  rotateY(-180);
  pointLight(255, 255, 255, -300, 500, 400);
  pointLight(255, 255, 255, 0, -500, 300);
  directionalLight(255, 255, 255, -1, -1, -1);
  
  // Pink Bunny 
  push();
  rotateY(-15);
  translate(200, 20, 0);
  scale(30,-30,30);
  fill(255, 184, 220);
  model(face);
  model(bunny);
  pop();
  
  push();
  rotateY(15);
  translate(-200, 20, 0);
  scale(30,-30,30);
  fill(255, 184, 220);
  model(face);
  model(bunny);
  pop();
  
  // Bunny Tower
  
  push();
  fill(194, 178, 219);
  translate(130, -150, 0);
  cylinder(8, 500);
  scale(30,-30,30);
  model(face);
  model(bunny);
  pop();
  
  push();
  fill(194, 178, 219);
  translate(-130, -150, 0);
  cylinder(8, 500);
  scale(30,-30,30);
  model(face);
  model(bunny);
  pop();
  
  //Eye
  translate(0, 60, 0);
  push();
  pointLight(255, 255, 255, mouseX, mouseY, 100);
  translate(26, -180, -60);
  fill(255, 0, 0);
  sphere(13);
  pop();
  
  push();
  translate(-26, -180, -60);
  pointLight(255, 255, 255, mouseX, mouseY, 100);
  fill(255, 0, 0);
  sphere(13);
  pop();
  
  //Bunny
  scale(100,-100,100);
  push();
  fill(255, 184, 220);
  model(face);
  fill(255);
  model(bunny);
  pop();

  pop();
}

function drawLotus() {
  // Set Light
  pointLight(255, 255, 255, -300, 500, 400);
  pointLight(255, 255, 255, 0, -500, 300);
  directionalLight(255, 255, 255, -1, -1, -1);
 
  // Lotus
  push();
  fill(255, 184, 220);
  translate(0, 200, 0);
  scale(30,-30,30);
  model(lotus);
  pop();
  
  // Ceiling
  push();
  pointLight(255, 255, 255, 100, -500, 0);
  fill(194, 178, 219);
  rotateY(180);
  translate(0, -320, 0);
  scale(90,-90,90);
  model(ceiling);
  pop();
}

function pray(){
  prayIsTrue = true;
}

function drawBubble() {
  push();

  // Bubble Class
  for(let i = 0; i < bubbles.length; i++) {
    bubbles[i].y-=3;
    
    // Bubble pop when reach corner
    if(bubbles[i].y < -height) {
      bubbles[i].y = height;
    }

    translate(bubbles[i].x, bubbles[i].y, bubbles[i].z);
    
    // Set Lighting
    ambientLight(255, 251, 176);
    directionalLight(255, 251, 176, 0, 0, -1);
    pointLight(255, 255, 255, -100, bubbles[i].y, 200);
    
    // Bunny Inside
    push();
    translate(0, 20, 0);
    rotateY(180);
    scale(15,-15, 15);
    fill(255);
    model(smallbunny);
    pop();
    
    // Bubble
    fill(255, 251, 176, 120); // Light yellow
    sphere(50);
  }
  pop();  
}

function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < currentPoses.length; i ++) {
    // For each pose detected, loop through all the keypoints
    const pose = currentPoses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j ++) {
      // A keypoint is an object describing a body part
      const keypoint = pose.keypoints[j];
      // Only take action if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        let wristDist = abs(pose.leftWrist.x - pose.rightWrist.x);
        let eyeShoulderDist = abs(pose.rightEye.y - pose.rightShoulder.y);
    
        if (eyeShoulderDist <70) {
          // Make the bubble fly
          pray();
        }
        
        if (wristDist < 50) {
          // Make the wheel rolling
          r += 5;
        }
      }
    }
  }
}

function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < currentPoses.length; i += 1) {
    const skeleton = currentPoses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      strokeWeight(2);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function gofullscreen() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
    // console.log("clicked");
    
  }
}
