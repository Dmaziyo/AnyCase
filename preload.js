const { contextBridge, ipcRenderer } = require('electron')
const { getGlobalShortCuts, DEFAULT_SHORTCUTS } = require('./setting')

contextBridge.exposeInMainWorld('electron', {
  getGlobalShortCuts,
  setShortCuts: newShortCuts => ipcRenderer.send('set-shortCuts', newShortCuts),
  DEFAULT_SHORTCUTS
})
