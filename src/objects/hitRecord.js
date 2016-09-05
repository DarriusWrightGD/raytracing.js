class HitRecord{
    constructor(hit,t, normal, hitPosition, material){
        this.hit = hit || false;
        this.t = t;
        this.normal = normal;
        this.hitPosition = hitPosition;
        this.material = material;
    }
}

module.exports = HitRecord;