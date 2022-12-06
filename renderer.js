let shortCuts = window.electron.getGlobalShortCuts()
const upper = document.getElementById('upper')
const lower = document.getElementById('lower')
const snake2camel = document.getElementById('snake2camel')
const camel2snake = document.getElementById('camel2snake')
const camel2kebab = document.getElementById('camel2kebab')
const saveBtn = document.getElementById('save')
const resetBtn = document.getElementById('reset')

function setIptValue() {
  upper.value = shortCuts['upperCase']
  lower.value = shortCuts['lowerCase']
  snake2camel.value = shortCuts['snake2Camel']
  camel2snake.value = shortCuts['camel2snake']
  camel2kebab.value = shortCuts['camel2kebab']
}

upper.addEventListener('keydown', event => {
  const key = event.key
  let shortCut
  console.log(key)
  if (!event.ctrlKey || !event.altKey) {
    event.preventDefault()
  }
  if (key !== 'Control' && key !== 'Alt' && event.ctrlKey) {
    shortCut = `Control +${key.toUpperCase()}`

    upper.value = shortCut
  } else if (key !== 'Alt' && key !== 'Control' && event.altKey) {
    shortCut = `Alt+$.toUpperCase()}`
    upper.value = shortCut
  }
})

lower.addEventListener('keydown', event => {
  const key = event.key
  let shortCut
  console.log(key)
  if (!event.ctrlKey || !event.altKey) {
    event.preventDefault()
  }
  if (key !== 'Control' && key !== 'Alt' && event.ctrlKey) {
    shortCut = `Control+${key.toUpperCase()}`

    lower.value = shortCut
  } else if (key !== 'Alt' && key !== 'Control' && event.altKey) {
    shortCut = `Alt +${key.toUpperCase()}}`
    lower.value = shortCut
  }
})

snake2camel.addEventListener('keydown', event => {
  const key = event.key
  let shortCut
  console.log(key)
  if (!event.ctrlKey || !event.altKey) {
    event.preventDefault()
  }
  if (key !== 'Control' && key !== 'Alt' && event.ctrlKey) {
    shortCut = `Control+${key.toUpperCase()}`

    snake2camel.value = shortCut
  } else if (key !== 'Alt' && key !== 'Control' && event.altKey) {
    shortCut = `Alt +${key.toUpperCase()}}`
    snake2camel.value = shortCut
  }
})
camel2snake.addEventListener('keydown', event => {
  const key = event.key
  let shortCut
  console.log(key)
  if (!event.ctrlKey || !event.altKey) {
    event.preventDefault()
  }
  if (key !== 'Control' && key !== 'Alt' && event.ctrlKey) {
    shortCut = `Control+${key.toUpperCase()}`

    camel2snake.value = shortCut
  } else if (key !== 'Alt' && key !== 'Control' && event.altKey) {
    shortCut = `Alt +${key.toUpperCase()}}`
    camel2snake.value = shortCut
  }
})

camel2kebab.addEventListener('keydown', event => {
  const key = event.key
  let shortCut
  console.log(key)
  if (!event.ctrlKey || !event.altKey) {
    event.preventDefault()
  }
  if (key !== 'Control' && key !== 'Alt' && event.ctrlKey) {
    shortCut = `Control+${key.toUpperCase()}`

    camel2kebab.value = shortCut
  } else if (key !== 'Alt' && key !== 'Control' && event.altKey) {
    shortCut = `Alt +${key.toUpperCase()}}`
    camel2kebab.value = shortCut
  }
})

saveBtn.addEventListener('click', () => {
  let newShortCuts = {
    upperCase: upper.value,
    lowerCase: lower.value,
    snake2Camel: snake2camel.value,
    camel2snake: camel2snake.value,
    camel2kebab: camel2kebab.value
  }
  window.electron.setShortCuts(newShortCuts)
  alert('Successfully saved')
})
resetBtn.addEventListener('click', () => {
  window.electron.setShortCuts(window.electron.DEFAULT_SHORTCUTS)
  setIptValue()
  alert('Reset saved')
})
setIptValue()
