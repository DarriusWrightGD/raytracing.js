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

    divide(num){
        return this.multiply(1/num);
    }

    mix(rhs){
        return new vec3(this.x * rhs.x,this.y * rhs.y,this.z * rhs.z);        
    }

    dot(rhs){
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    }

    cross(rhs){
        return new vec3(
            this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x
        );
    }

    refract(normal, niOverNt){
        let uv = this.getNormalized();
        let dt = uv.dot(normal);
        let discriminant = 1.0 - niOverNt * niOverNt * (1-dt*dt);
        if(discriminant > 0){
            return this.subtract(normal.multiply(dt))
            .multiply(niOverNt)
            .subtract(normal.multiply(Math.sqrt(discriminant)));
        }
    }

    reflect(rhs){
        return this.subtract( rhs.multiply(2.0 * this.dot(rhs)));
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

    updateFromJson(object){
        this.x = object.x;
        this.y = object.y;
        this.z = object.z;
    }
}

module.exports = vec3;