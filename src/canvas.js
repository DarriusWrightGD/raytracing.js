const electron = require('electron');
const ipc = electron.ipcRenderer;

const vec3 = require('./math/vec3');
const Random = require('./math/random');
const ray = require('./math/ray');
const Sphere = require('./objects/sphere');
const HitRecord = require('./objects/hitRecord');
const World = require('./objects/world');
const Camera = require('./camera/camera');
const Metal = require('./objects/materials/metal');
const Lambertain = require('./objects/materials/lambertain');
const Dielectric = require('./objects/materials/dielectric');

let width = 400;
let height = 300;

const MAX_DEPTH = 50;
const SAMPLE_COUNT = 5;

width = 300;
height = 150;

let imageData;

let world;
randomScene();
ipc.send('world-changed', world);


const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
setCanvasDimensions(canvas, width, height);
clearCanvas();

draw();

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

function setPixel(x,y,color){
    let pixel = (x + (width * y)) * 4;
    imageData.data[pixel] = color.x;
    imageData.data[pixel +1] = color.y;
    imageData.data[pixel +2] = color.z;
    imageData.data[pixel +3] = 255;
}

function colorRay(r, world, depth){
    let hitRecord = world.hit(r, 0, Number.MAX_VALUE);
    if(hitRecord.hit){
        if(depth < MAX_DEPTH){
            let scatterRecord = hitRecord.material.scatter(r,hitRecord)
            return (scatterRecord.scatter) ? colorRay(scatterRecord.scatteredRay,world, depth +1).mix(scatterRecord.attenuation) : new vec3(0,0,0);
        }else{
            return new vec3(0,0,0)
        }
    }
    else{
        let direction = r.direction.getNormalized();
        let t = 0.5 * (direction.y + 1.0);
        return new vec3(1,1,1).multiply(1.0-t).add(new vec3(0.5,0.7,1.0).multiply(t));
    }

}

function randomScene(){
    let hitables = new Array(500);
    hitables[0] = new Sphere(new vec3(0,-1000, 0), 1000 , new Lambertain(new vec3(0.5,0.5,0.5)));
    let i = 1;
    for(let a = 0; a < 2; a++){
        for(let b = 0; b < 2; b++){
            let materialChoice = Math.random();
            let center = new vec3(a + 0.9 * Math.random(), 0.2, b + 0.9 * Math.random() )
            if(materialChoice < 0.6){
                hitables[i++] = new Sphere(center, 0.2, new Lambertain(Random.randomVector()));
            }else if (materialChoice < 0.95){
                hitables[i++] = new Sphere(center, 0.2, new Metal(Random.randomVector()));
            }else{
                hitables[i++] = new Sphere(center, 0.2, new Dielectric(1.5));
            }
        }        
    }
    world = new World(hitables);
}

function draw(){
    const lookFrom = new vec3(7,7,4);
    const lookAt = new vec3(0,0,-1);
    const camera = new Camera(lookFrom, lookAt, 
        new vec3(0,1,0), 20, width/height, 
        0.2, lookFrom.subtract(lookAt).length());
        
    const sampleCount = SAMPLE_COUNT;
    const start = new Date().getTime();
    
    for(let y = height; y >= 0; y--){
        for(let x = 0; x < width; x++){
            let color = new vec3(0,0,0);
            for(let s = 0; s < sampleCount; s++){
                let u = (x + Math.random())/width, v = (y + Math.random())/height;
                let cameraRay = camera.getRay(u,v)
                color = color.add(colorRay(cameraRay, world, 0));
            }
            color = color.multiply(1/sampleCount);
            color = new vec3(Math.sqrt(color.x),Math.sqrt(color.y),Math.sqrt(color.z));
            color = color.multiply(255.99).floor();
            setPixel(x,height - y,color);
        }
    }
    
    context.putImageData( imageData, 0, 0 );     

    let stop = new Date().getTime();
    let time = stop-start;
    console.log(`Time:${time/1000}, FPS: ${1000/time}`);
}

ipc.on('update-object', (event, object)=>{
    let elementPosition = world.hitables.map((x)=>x.id).indexOf(object.id);
    let objectToUpdate = world.hitables[elementPosition];
    objectToUpdate.updateFromJson(object);
    ipc.send('world-changed', world);
    draw();
})