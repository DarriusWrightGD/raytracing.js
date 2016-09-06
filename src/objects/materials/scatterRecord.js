const ray = require('./../../math/ray');
const vec3 = require('./../../math/vec3');

class ScatterRecord {
    constructor(scatter,scatteredRay, attenuation ){
        this.scatter = scatter || false;
        this.scatteredRay = scatteredRay || new ray();
        this.attenuation = attenuation || new vec3();
    }
}

module.exports = ScatterRecord;
