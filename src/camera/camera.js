const vec3 = require('./../math/vec3');
const ray = require('./../math/ray');

class Camera {
    constructor(){
        this.lowerLeftCorner = new vec3(-2.0,-1.0,-1.0);
        this.horizontal = new vec3(4.0,0.0,0.0);
        this.vertical = new vec3(0.0, 2.0, 0.0);
        this.origin = new vec3(0.0,0.0,0.0);
    }

    getRay(u,v){
        return new ray(this.origin, this.lowerLeftCorner
        .add(this.horizontal.multiply(u))
        .add(this.vertical.multiply(v))
        .subtract(this.origin));
    }
}

module.exports = Camera;