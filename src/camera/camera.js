const vec3 = require('./../math/vec3');
const ray = require('./../math/ray');

class Camera {
    constructor(fov, aspectRatio){
        let theta = fov * Math.PI / 180.0;
        let halfHeight = Math.tan(theta/2);
        let halfWidth = aspectRatio * halfHeight;

        this.lowerLeftCorner = new vec3(-halfWidth, -halfHeight,-1.0);
        this.horizontal = new vec3(2* halfWidth,0.0,0.0);
        this.vertical = new vec3(0.0, 2.0 * halfHeight, 0.0);
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