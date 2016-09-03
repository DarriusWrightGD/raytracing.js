require('./vec3');

class ray{
    constructor(origin, direction){
        this.origin = origin || new vec3(0,0,0);
        this.direction = direction || new vec3(0,0,1);
    }

    point(t){
        return origin.add(direction.multiply(t));
    }
}

module.exports = ray;