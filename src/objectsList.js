const electron = require('electron');
const ipc = electron.ipcRenderer;

let objectList = document.getElementById('objects');
let worldObjects = [];
objectList.addEventListener('click', (event, id)=>{

})

window.objectSelected = (id)=>{
    ipc.send('object-selected', worldObjects.hitables.filter(o=>o.id == id)[0]);
}

ipc.on('world-changed', (event, world)=>{
    let html = '';
    worldObjects = world;
    world.hitables.forEach(o=> html += `<li class="list-group-item" id='object-${o.id}' onclick='objectSelected(${o.id})'>${o.constructor.name} ${o.id}</li>`)
    objectList.innerHTML = html; 
});