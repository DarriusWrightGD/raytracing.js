const vec3 = require('./vec3');

module.exports = {
    randomInUnitSphere: function(){
        let point;
        do{
            point = new vec3(Math.random(), Math.random(), Math.random()).multiply(2.0).subtract(new vec3(1,1,1));
        }while(point.dot(point) >= 1.0);
        return point;
    },
    randomUnitInDisk: function() {
        let point;
        do{
            point = new vec3(Math.random(), Math.random(), 0).multiply(2.0).subtract(new vec3(1,1,0));
        }while(point.dot(point) >= 1.0);
        return point;
    },
    randomVector: function(){
        return new vec3(Math.random(),Math.random(), Math.random());
    }
}