var vec3 = require('./math/vec3');
var ray = require('./math/ray');


let width = 500;
let height = 300;

class Sphere{
    constructor(center, radius, color){
        this.center = center || vec3(0,0,0);
        this.radius = radius || 1.0;
        this.color = color || new vec3(1,0,0);
    }

    hit(ray){
        let originToCenter = ray.origin.subtract(this.center);

        let a = ray.direction.dot(ray.direction);
        let b = 2.0 * originToCenter.dot(ray.direction);
        let c = originToCenter.dot(originToCenter) - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        
        return discriminant > 0;
    }
}

// width = 10;
// height = 4;

let imageData;

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

function colorRay(ray, sphere){
    if(sphere.hit(ray)){
        return new vec3(1,0,0);
    }

    let direction = ray.direction.getNormalized();
    let t = 0.5 * (direction.y + 1.0);
    return new vec3(1,1,1).multiply(1.0-t).add(new vec3(0.5,0.7,1.0).multiply(t));
}

function draw(){
    const lowerLeftCorner = new vec3(-2.0,-1.0,-1.0);
    const horizontal = new vec3(4.0,0.0,0.0);
    const vertical = new vec3(0.0, 2.0, 0.0);
    const origin = new vec3(0.0,0.0,0.0);
    const sphere = new Sphere(new vec3(0,0,-1), 0.5);
    for(let y = height -1; y >= 0; y--){
        for(let x = 0; x < width; x++){
            let u = x/width, v = y/height;

            let cameraRay = new ray(origin, lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)));
            let color = colorRay(cameraRay, sphere).multiply(255.99).floor();

            setPixel(x,y,color.x, color.y, color.z);
        }
    }
    context.putImageData( imageData, 0, 0 );     
}