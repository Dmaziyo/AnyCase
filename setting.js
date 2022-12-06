const Store = require('electron-store')
const { globalShortcut } = require('electron')
const {
  UpperCase,
  LowerCase,
  snake2Camel,
  camel2snake,
  camel2Kebab
} = require('./utils')
const store = new Store()

const DEFAULT_SHORTCUTS = {
  upperCase: 'Control+U',
  lowerCase: 'Control+L',
  snake2Camel: "Control+'",
  camel2snake: 'Control+]',
  camel2kebab: 'Control+['
}
function getGlobalShortCuts() {
  const shortCuts = store.get('shortCuts')
  if (shortCuts) {
    return shortCuts
  } else {
    store.set('shortCuts', DEFAULT_SHORTCUTS)
    return DEFAULT_SHORTCUTS
  }
}
function setGlobalShortCuts(newShortCuts) {
  store.set('shortCuts', newShortCuts)
  registerKey()
}

function registerKey() {
  let shortCuts = getGlobalShortCuts()
  globalShortcut.unregisterAll()
  globalShortcut.register(shortCuts['upperCase'], UpperCase)
  globalShortcut.register(shortCuts['lowerCase'], LowerCase)
  globalShortcut.register(shortCuts['snake2Camel'], snake2Camel)
  globalShortcut.register(shortCuts['camel2snake'], camel2snake)
  globalShortcut.register(shortCuts['camel2kebab'], camel2Kebab)
}

module.exports = {
  getGlobalShortCuts,
  setGlobalShortCuts,
  registerKey,
  DEFAULT_SHORTCUTS
}
