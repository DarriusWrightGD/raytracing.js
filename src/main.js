const electron = require('electron');

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