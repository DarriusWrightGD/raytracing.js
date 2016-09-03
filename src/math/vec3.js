class vec3 {
    constructor(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(rhs){
        return new vec3(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z);
    }

    subtract(rhs){
        return new vec3(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z);
    }

    multiply(num){
        return new vec3(this.x * num,this.y * num,this.z * num);
    }

    dot(rhs){
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    }

    cross(rhs){
        return new vec3(
            this.y * rhs.z - this.z * rhs.y,
            this.x * rhs.y - this.y * rhs.x,
            this.z * rhs.x - this.x * rhs.z
        );
    }

    floor(){
        return new vec3(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z));
    }

    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    squaredLength(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    getNormalized(){
        return this.multiply(1.0/this.length());
    }
}

module.exports = vec3;