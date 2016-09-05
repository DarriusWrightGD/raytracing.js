const ScatterRecord = require('./scatterRecord')

class Material {
    scatter(ray, hitRecord) {return new ScatterRecord()}
}

module.exports = Material;