const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
//hot reload when js file changes
// require('electron-reload')(__dirname);
// require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
//   });

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        icon: __dirname + './src/favicon.ico',
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
