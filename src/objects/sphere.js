const vec3 = require('./../math/vec3');
const ray = require('./../math/ray');
const Hitable = require('./hitable');
const HitRecord = require('./hitRecord');
const Material = require('./materials/material')

class Sphere extends Hitable{
    constructor(center, radius, material){
        super();
        this.center = center || vec3(0,0,0);
        this.radius = radius || 1.0;
        this.material = material || new Material();
    }

    hit(ray, tmin, tmax){
        let originToCenter = ray.origin.subtract(this.center);

        let a = ray.direction.dot(ray.direction);
        let b =  originToCenter.dot(ray.direction);
        let c = originToCenter.dot(originToCenter) - this.radius * this.radius;
        let discriminant = b * b -  a * c;
        
        if(discriminant > 0){
            let temp = (-b - Math.sqrt(b*b-a*c))/a;
            if(temp > tmin && temp < tmax){
                return this.calculateHitRecord(temp, ray.point(temp));
            }
            temp = (-b + Math.sqrt(b*b-a*c))/a;
            if(temp > tmin && temp < tmax){
                return this.calculateHitRecord(temp, ray.point(temp));
            }
        }

        return new HitRecord();
    }

    calculateHitRecord(t, hitPosition){
        return new HitRecord(true, t,hitPosition.subtract(this.center).multiply(1/this.radius),hitPosition, this.material)
    }
};

module.exports = Sphere;
