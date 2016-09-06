const Material = require('./material')
const ray = require('./../../math/ray');
const ScatterRecord = require('./scatterRecord');
const Random = require('./../../math/random');
const vec3 = require('./../../math/vec3');

class Dielectric extends Material {
    constructor(refractionIndex){
        super();
        this.refractionIndex = refractionIndex || 1.5;
    }

    schlick(cosine, refractionIndex){
        let r0 = (1-refractionIndex)/(1+refractionIndex);
        let r02 = r0*r0;
        return r02 + (1-r02) * Math.pow((1-cosine), 5);
    }

    updateFromJson(object){
        this.refractionIndex = object.refractionIndex;
    }

    scatter(rayIn, hitRecord) {
        let scatteredRay;
        let reflectProb;
        let outwardNormal;
        let reflected = rayIn.direction.reflect(hitRecord.normal);
        let niOverNt;
        let cosine;

        if(rayIn.direction.dot(hitRecord.normal) > 0){
            outwardNormal = hitRecord.normal.multiply(-1);
            niOverNt = this.refractionIndex;
            cosine = this.refractionIndex * rayIn.direction.dot(hitRecord.normal) / rayIn.direction.length();
        
        }else {
         outwardNormal = hitRecord.normal;
            niOverNt = 1.0/this.refractionIndex;
            cosine = -(rayIn.direction.dot(hitRecord.normal)) / rayIn.direction.length();
        }

        let refracted = rayIn.direction.refract(outwardNormal, niOverNt);

        reflectProb = (refracted) ? this.schlick(cosine, this.refractionIndex) : 1.0;

        if(Math.random() < reflectProb){
            scatteredRay = new ray(hitRecord.hitPosition, reflected)
        }else{
            scatteredRay = new ray(hitRecord.hitPosition, refracted);
        }

        return new ScatterRecord(true,scatteredRay,new vec3(1.0,1.0,1.0));        
    }
}

module.exports = Dielectric;