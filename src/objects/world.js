const HitRecord = require('./hitRecord');

class World{
    constructor(hitables){
        this.hitables = hitables || [];
    }

    hit(ray, tmin, tmax){
        let hitRecord = new HitRecord();
        this.hitables.forEach((hitable)=>{
            let tempHitRecord = hitable.hit(ray,tmin, tmax);

            if(tempHitRecord.hit && ( !hitRecord.t || tempHitRecord.t < hitRecord.t)){
                hitRecord = tempHitRecord;
            }
        })
        return hitRecord;
    }
}

module.exports = World;