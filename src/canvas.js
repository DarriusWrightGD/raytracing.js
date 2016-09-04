const vec3 = require('./math/vec3');
const ray = require('./math/ray');
const Sphere = require('./objects/sphere');
const HitRecord = require('./objects/hitRecord');
const World = require('./objects/world');
const Camera = require('./camera/camera');

let width = 500;
let height = 300;

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



function colorRay(ray, world){
    let hitRecord = world.hit(ray, 0, Number.MAX_VALUE);
    if(hitRecord.hit){
        let normal = hitRecord.normal;
        return new vec3(normal.x +1, normal.y +1, normal.z + 1).multiply(0.5);
    }

    let direction = ray.direction.getNormalized();
    t = 0.5 * (direction.y + 1.0);
    return new vec3(1,1,1).multiply(1.0-t).add(new vec3(0.5,0.7,1.0).multiply(t));
}

function draw(){
    const camera = new Camera();
    const sampleCount = 8;
    const world = new World([new Sphere(new vec3(0,0,-1), 0.5), new Sphere(new vec3(0,-100.5,-1), 100) ]);
    for(let y = height; y >= 0; y--){
        for(let x = 0; x < width; x++){
            let color = new vec3(0,0,0);
            for(let s = 0; s < sampleCount; s++){
                let u = (x + Math.random())/width, v = (y + Math.random())/height;
                let cameraRay = camera.getRay(u,v)
                color = color.add(colorRay(cameraRay, world));
            }
            color = color.multiply(1/sampleCount).multiply(255.99).floor();
            setPixel(x,height - y,color.x, color.y, color.z);
        }
    }
    context.putImageData( imageData, 0, 0 );     
}