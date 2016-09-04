class HitRecord{
    constructor(hit,t, normal, hitPosition){
        this.hit = hit || false;
        this.t = t;
        this.normal = normal;
        this.hitPosition = hitPosition;
    }
}

module.exports = HitRecord;