const vec3 = require('./../math/vec3');
const Random = require('./../math/random');
const ray = require('./../math/ray');

class Camera {
    constructor(lookFrom, lookAt, up, fov, aspectRatio, aperture, focusDistance){
        let theta = fov * Math.PI / 180;
        let halfHeight = Math.tan(theta/2);
        let halfWidth = aspectRatio * halfHeight;

        this.lensRadius = aperture /2.0;

        this.origin = lookFrom;

        this.w = lookFrom.subtract(lookAt).getNormalized();
        this.u = up.cross(this.w).getNormalized();
        this.v = this.w.cross(this.u);

        this.lowerLeftCorner = this.origin
            .subtract(this.u.multiply(focusDistance * halfWidth))
            .subtract(this.v.multiply(focusDistance * halfHeight))
            .subtract(this.w.multiply(focusDistance));

        this.horizontal = this.u.multiply(2*halfWidth * focusDistance);
        this.vertical =  this.v.multiply(2*halfHeight * focusDistance);
    }

    getRay(s,t){
        let rd = Random.randomUnitInDisk().multiply(this.lensRadius);
        let offset = this.u.multiply(rd.x).add(this.v.multiply(rd.y));
        return new ray(this.origin.add(offset), this.lowerLeftCorner
        .add(this.horizontal.multiply(s))
        .add(this.vertical.multiply(t))
        .subtract(this.origin)
        .subtract(offset));
    }
}

module.exports = Camera;