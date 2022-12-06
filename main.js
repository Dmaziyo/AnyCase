const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const { registerKey, setGlobalShortCuts } = require('./setting')

//
/**
 * 找一个能存储读取数据的store
 * 开机的时候启动store读取,若无数据,则使用默认值
 * 若有,则设置
 * 在软件的应用中,可以重新设置store,并且能够修改global shortCut
 */

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 为了解决require 识别问题,
      contextIsolation: true,
      enableRemoteModule: true
    },
    resizable: false
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.on('set-shortCuts', (event, arg) => {
    setGlobalShortCuts(arg)
  })
  const tray = new Tray('icon.png')

  tray.on('double-click', function () {
    mainWindow.show()
  })
  tray.setToolTip('AnyCase')
  let template = [
    {
      label: '显示',
      click: function () {
        mainWindow.show()
      }
    },
    {
      label: '退出',
      click: function () {
        app.quit()
      }
    }
  ]
  let contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
  mainWindow.on('minimize', () => {
    mainWindow.hide()
  })
  registerKey()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
