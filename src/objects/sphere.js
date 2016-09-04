const vec3 = require('./../math/vec3');
const ray = require('./../math/ray');
const Hitable = require('./hitable');
const HitRecord = require('./hitRecord');

class Sphere extends Hitable{
    constructor(center, radius, color){
        super();
        this.center = center || vec3(0,0,0);
        this.radius = radius || 1.0;
        this.color = color || new vec3(1,0,0);
    }

    hit(ray, tmin, tmax){
        let originToCenter = ray.origin.subtract(this.center);

        let a = ray.direction.dot(ray.direction);
        let b = 2.0 * originToCenter.dot(ray.direction);
        let c = originToCenter.dot(originToCenter) - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        
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
        return new HitRecord(true, t,hitPosition.subtract(this.center).multiply(1/this.radius),hitPosition)
    }
};

module.exports = Sphere;
