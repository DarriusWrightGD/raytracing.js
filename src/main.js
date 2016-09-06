const electron = require('electron');
const ipc = electron.ipcMain;

const {app, BrowserWindow} = electron;
require('electron-reload')(__dirname, {
    electron: require('electron-prebuilt')
});

let mainWindow;

let createWindow = ()=>{
    mainWindow = new BrowserWindow({
        height: 1000,
        width: 800
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', ()=>{
        mainWindow = null;
    })
};

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(mainWindow === null) createWindow();
});

ipc.on('world-changed', (event, worldChanged)=>{
    mainWindow.webContents.send('world-changed', worldChanged)
})

ipc.on('object-selected', (event, objectSelected)=>{
    mainWindow.webContents.send('object-selected', objectSelected)
})

ipc.on('update-object', (event, updateObject)=>{
    mainWindow.webContents.send('update-object', updateObject);
})