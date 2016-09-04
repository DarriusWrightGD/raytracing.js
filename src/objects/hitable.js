const HitRecord = require('./hitRecord');

class Hitable{
    hit(ray, tmin, tmax){
        return new HitRecord();
    }
}

module.exports=  Hitable;