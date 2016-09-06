const HitRecord = require('./hitRecord');

let objectId = 0;

class Hitable{
    constructor(){
        this.id = objectId++;
        this.className = this.constructor.name;
        this.name = `${this.className} ${this.id}`
    }
    hit(ray, tmin, tmax){
        return new HitRecord();
    }
}

module.exports=  Hitable;