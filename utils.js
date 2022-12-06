var robot = require('@jitsi/robotjs')
const { clipboard } = require('electron')

function UpperCase() {
  let text
  robot.keyTap('c', 'control')
  text = clipboard.readText()
  clipboard.writeText(text.toUpperCase())
  robot.keyTap('v', 'control')
  clipboard.writeText('')
}
function LowerCase() {
  let text
  robot.keyTap('c', 'control')
  text = clipboard.readText()
  clipboard.writeText(text.toLowerCase())
  robot.keyTap('v', 'control')
  clipboard.writeText('')
}

function snake2Camel() {
  let text
  robot.keyTap('c', 'control')
  text = clipboard.readText()
  camelText = text.replace(/([-_][a-z])/g, $1 => {
    console.log($1.toUpperCase())
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
  clipboard.writeText(camelText)
  robot.keyTap('v', 'control')
  clipboard.writeText('')
}

function camel2snake() {
  let text
  robot.keyTap('c', 'control')
  text = clipboard.readText()
  camelText = text.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
  clipboard.writeText(camelText)
  robot.keyTap('v', 'control')
  clipboard.writeText('')
}

function camel2Kebab() {
  let text
  robot.keyTap('c', 'control')
  text = clipboard.readText()
  camelText = text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  clipboard.writeText(camelText)
  robot.keyTap('v', 'control')
  clipboard.writeText('')
}
module.exports = {
  UpperCase,
  LowerCase,
  snake2Camel,
  camel2snake,
  camel2Kebab
}
