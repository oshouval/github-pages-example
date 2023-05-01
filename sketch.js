
let num = 0;
let facemesh;
let video;

let osc1, osc2, leftLength, rightLength;

let osc1Freq = 440;
let osc2Freq = 440;

let points = [];

let predictions = [];

function setup() {
  createCanvas(640, 480);
  
  
  button = createButton('start oscillator');
  button.position(0,500);
  button.mousePressed(oscOn);
  
  frameRate(10);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  osc1 = new p5.Oscillator("sine");
  osc2 = new p5.Oscillator("sine");

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("face", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}


function oscOn(){

  osc1.start();
  osc2.start();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  
  
  image(video, 0, 0, width, height);

  // We call function to draw all keypoints
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    
  

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      
      const [x, y] = keypoints[j];
      
       fill(0, 255, 0);
      
//       if(j == num){
//         fill(255,0,0)
//         ellipse(x, y, 10, 10);
//       }
      
//       else{
        // ellipse(x, y, 5, 5);
//       }
      
      if(j == 123){
        points[0] = x;
        points[1] = y;
      }
      if(j == 137)
      {
         points[2] = x;
        points[3] = y;
      }
       if(j == 352)
      {
         points[4] = x;
        points[5] = y;
      }
      
       if(j == 366)
      {
        points[6] = x;
        points[7] = y;
      }
  
       ellipse(x, y, 5, 5);
     
      
    }
    
    
  }
  
  
  leftLength = dist(points[0], points[1], points[2], points[3]);
  rightLength = dist(points[4], points[5], points[6], points[7]);
  
  
  osc1.freq(440 - leftLength);
  osc2.freq(440 - rightLength);
  
  
  line(points[0], points[1], points[2], points[3])
  line(points[4], points[5], points[6], points[7])
  

}


function mousePressed(){
  num++;
 
  
}