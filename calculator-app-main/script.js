const screen = document.querySelector('[data-screen]')
const keys = [...document.querySelectorAll('[data-key]')]

let last = ''
let buffer = ''
const calculateBuffer = () => {
  console.log('eval', eval(buffer))
  buffer = eval(buffer).toString()
}

const handleKeyPress = ({ target }) => {
  const key = target.getAttribute('data-key')
  const tmpStr = screenText + key
  console.log(tmpStr)
  console.log(buffer)
  console.log(last)

  if (tmpStr.match(/^[0-9]+\.?[0-9]*$/)) {
    if (last === 'equals') buffer = ''
    if (last !== 'digit') setScreenText(key)
    else setScreenText(tmpStr)
    buffer += key
    last = 'digit'
    return
  }

  switch (key.toLowerCase()) {
    case 'reset':
      setScreenText('')
      buffer = ''
      last = 'reset'
      return
    case 'plus':
      if (last === 'digit') {
        calculateBuffer()
        setScreenText(buffer)
      }
      buffer = last === 'digit' ? buffer + '+' : buffer.slice(0, -1) + '+'
      last = 'plus'
      return
    case 'minus':
      if (last === 'digit') {
        calculateBuffer()
        setScreenText(buffer)
      }
      buffer = last === 'digit' ? buffer + '-' : buffer.slice(0, -1) + '-'
      last = 'minus'
      return
    case 'times':
      buffer = last === 'digit' ? buffer + '*' : buffer.slice(0, -1) + '*'
      last = 'times'
      return
    case 'divide':
      buffer = last === 'digit' ? buffer + '/' : buffer.slice(0, -1) + '/'
      last = 'divide'
      return
    case 'equals':
      if (last === 'digit') {
        calculateBuffer()
        setScreenText(buffer)
      } else {
        buffer = buffer.slice(0, -1)
        calculateBuffer()
        setScreenText(buffer)
      }
      last = 'equals'
      return
  }

  //   if (key.)
}

keys.forEach((key) => {
  key.addEventListener('click', handleKeyPress)
})

let result
let screenText = ''

const setScreenText = (newText) => {
  screenText = newText
  console.log(screenText)
  screen.querySelector('span').textContent = screenText
    ? screenText.slice(-1) === '.'
      ? parseFloat(screenText + '0').toLocaleString() + ','
      : last !== 'digit'
      ? parseFloat(screenText).toLocaleString()
      : parseFloat(screenText).toLocaleString(undefined, { maximumFractionDigits: 20 })
    : ''
}
