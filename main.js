const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const { registerKey, setGlobalShortCuts } = require('./setting')

// 开机自启
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true,
  path: process.execPath,
  args: ['--processStart', `"${exeName}"`]
})

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
let tray = null
app.whenReady().then(() => {
  createWindow()
  ipcMain.on('set-shortCuts', (event, arg) => {
    setGlobalShortCuts(arg)
  })
  tray = new Tray(path.join(__dirname, 'img/icon.png'))

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
    },
    {
      type: 'checkbox',
      label: '开机启动',
      checked: app.getLoginItemSettings().openAtLogin,
      click: function () {
        if (!app.isPackaged) {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
            path: process.execPath
          })
        } else {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin
          })
        }
        console.log(app.getLoginItemSettings().openAtLogin)
        console.log(!app.isPackaged)
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
