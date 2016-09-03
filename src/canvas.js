var vec3 = require('./math/vec3');
var ray = require('./math/ray');


let width = 400;
let height = 200;

let imageData;

function isNumeric(n) {
    return isNaN(parseFloat(n)) && isFinite(n);
}



const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
setCanvasDimensions(canvas, width, height);
clearCanvas();

var start = new Date().getTime();
draw();
var stop = new Date().getTime();
var time = stop-start;
console.log(`Time:${time/1000}, FPS: ${1000/time}`);

function setCanvasDimensions(w,h){
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    context.rect(0,0,width,height);
    context.fill();
    imageData = context.createImageData(width,height);
}

function clearCanvas(){
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            setPixel(x,y,0,0,0);
        }
    }
}

function setPixel(x,y,r,g,b){
    let pixel = (x + (width * y)) * 4;
    imageData.data[pixel] = r;
    imageData.data[pixel +1] = g;
    imageData.data[pixel +2] = b;
    imageData.data[pixel +3] = 255;
}

function draw(){
     for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let color = new vec3(x/width,y/height,0.2).multiply(255.99).floor();

            setPixel(x,y,color.x, color.y, color.z);
        }
    }
    context.putImageData( imageData, 0, 0 );     
}