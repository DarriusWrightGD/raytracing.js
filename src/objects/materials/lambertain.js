const Material = require('./material')
const Random = require('./../../math/random');
const ray = require('./../../math/ray');
const ScatterRecord = require('./scatterRecord')


class Lambertain extends Material{
    constructor(albedo){
        super();
        this.albedo = albedo || new vec3();
    }

    scatter(rayIn, hitRecord) {
        let target = hitRecord.hitPosition.add(hitRecord.normal).add(Random.randomInUnitSphere());
        let scatteredRay = new ray(hitRecord.hitPosition, target.subtract(hitRecord.hitPosition))
        return new ScatterRecord(true, scatteredRay, this.albedo);
    }
}

module.exports = Lambertain;
