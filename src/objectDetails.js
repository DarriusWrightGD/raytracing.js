const electron = require('electron');
const ipc = electron.ipcRenderer;

const Sphere = require('./objects/sphere');
const vec3 = require('./math/vec3');

let objectDetails = document.getElementById('object-details');
let objectModel;


ipc.on('object-selected', (event, object)=>{
    renderObjectDetails(object);
    objectModel = object;
})

let renderObjectDetails = (object)=>{
    let html = sphereHtml(object);
    objectDetails.innerHTML = html;
}

window.updateObject = ()=>{
    updateSphereObject(objectModel);
}

let updateSphereObject = (object)=>{
    let x = $('#xPositionInput').val();
    let y = $('#yPositionInput').val();
    let z = $('#zPositionInput').val();

    let position = new vec3(parseFloat(x),parseFloat(y),parseFloat(z));

    let radius = parseFloat($('#RadiusInput').val())
    objectModel.center = position;
    objectModel.radius = radius;

    ipc.send('update-object', objectModel);
}

let sphereHtml = (object)=>{
    return `
        ${vec3Html('Position', object.center)}
        ${numberHtml('Radius', object.radius)}
        ${submitHtml()}
    `;
}

let vec3Html = (title, vector) =>{
    return `
        <div class="row">
            <span class='col-xs-2' style="vertical-align=middle;">${title}:</span>
            <div class="form-group col-xs-3">
                <input type="text" class="form-control" type='number' id="x${title}Input" value="${vector.x}">
            </div>
            <div class="form-group col-xs-3">
                <input type="text" class="form-control" type='number' id="y${title}Input" value="${vector.y}">
            </div>
            <div class="form-group col-xs-3">
                <input type="text" class="form-control" type='number' id="z${title}Input" value="${vector.z}">
            </div>
        </div>
    `
}

let numberHtml = (title, num) => {
    return `
        <div class="row">
            <span class='col-xs-2' style="vertical-align=middle;">${title}:</span>
            <div class="form-group col-xs-3">
                <input type="text" class="form-control" type='number' id="${title}Input" value="${num}">
            </div>
        </div>
    `
}

let submitHtml = ()=>{
    return `
     <button type="submit" class="btn btn-default" onclick='updateObject()'>Update</button>
    `
}