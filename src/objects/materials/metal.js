const Material = require('./material')
const ray = require('./../../math/ray');
const ScatterRecord = require('./scatterRecord');
const Random = require('./../../math/random');

class Metal extends Material {
    constructor(albedo, f){
        super();
        this.albedo = albedo || new vec3();
        this.setFuzzy(f);
    }

    setFuzzy(f){
        this.fuzzy = (f < 1) ? f : 1;
    }

    scatter(rayIn, hitRecord) {
        let reflected = rayIn.direction.getNormalized().reflect(hitRecord.normal)
        let randomFuzz = Random.randomInUnitSphere().multiply(this.fuzzy);
        let scatteredRay = new ray(hitRecord.hitPosition, reflected.add(randomFuzz));
        return new ScatterRecord(scatteredRay.direction.dot(hitRecord.normal) > 0, scatteredRay, this.albedo);
    }
}

module.exports = Metal;
