require('./vec3');

class ray{
    constructor(origin, direction){
        this.origin = origin || new vec3(0,0,0);
        this.direction = direction || new vec3(0,1,10);
    }

    point(t){
        return this.origin.add(this.direction.multiply(t));
    }
}

module.exports = ray;