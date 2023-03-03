const checker = document.querySelector("[data-checker]")
const calculator = document.querySelector("[data-calculator]")
const calcKeypad = document.querySelector("[data-calc-keypad]")
const previousOperand = document.querySelector("[data-prev-operand]")
const currentOperand = document.querySelector("[data-current-operand]")

let firstOperand = ""
let secondOperand = ""
let operation = ""
let result = null

function getThemeChoice(e) {
  const themeChoice = Number(e.target.value)
  changeTheme(themeChoice)
}

function addOrRemoveClass(el, className, remove = true) {
  if (remove) {
    el.classList.remove(className)
    return
  }
  el.classList.add(className)
}

function changeTheme(themeChoice) {
  switch (themeChoice) {
    case 2:
      addOrRemoveClass(calculator, "theme2", false)
      addOrRemoveClass(calculator, "theme1")
      addOrRemoveClass(calculator, "theme3")
      break
    case 3:
      addOrRemoveClass(calculator, "theme3", false)
      addOrRemoveClass(calculator, "theme1")
      addOrRemoveClass(calculator, "theme2")
      break
    default:
      addOrRemoveClass(calculator, "theme1", false)
      addOrRemoveClass(calculator, "theme2")
      addOrRemoveClass(calculator, "theme3")
  }
}

function getOperation(target) {
  calcul(operation)
  return target
}

function getNumber(target) {
  if (operation === "") {
    if (target === "." && firstOperand.includes(".")) return
    firstOperand += target
  } else {
    if (target === "." && secondOperand.includes(".")) return
    secondOperand += target
  }
}

function calcul(operation) {
  if (operation === "+") result = Number(firstOperand) + Number(secondOperand)
  if (operation === "-") result = Number(firstOperand) - Number(secondOperand)
  if (operation === "x") result = Number(firstOperand) * Number(secondOperand)
  if (operation === "/") result = Number(firstOperand) / Number(secondOperand)

  if (result === Infinity || result === 0) {
    reset()
    return
  }

  if (result) {
    firstOperand = result
    operation = ""
    secondOperand = ""
  }
}

function updateScreen() {
  if (!firstOperand) {
    reset()
    return
  }

  currentOperand.textContent = firstOperand
  previousOperand.textContent = `${firstOperand} ${operation} ${secondOperand}`
}

function del() {
  if (!firstOperand && !secondOperand) return

  if (secondOperand) {
    secondOperand = secondOperand.toString().slice(0, -1)
  } else {
    firstOperand = firstOperand.toString().slice(0, -1)
  }
}

function reset() {
  firstOperand = ""
  secondOperand = ""
  operation = ""
  result = null

  previousOperand.textContent = ""
  currentOperand.textContent = "0"
}

function getCalcType(e) {
  if (e.target.classList.contains("calc-keypad")) return
  if (e.target.classList.contains("keypad")) return

  const target = e.target.innerText

  switch (target) {
    case "+":
    case "-":
    case "x":
    case "/":
      operation = getOperation(target)
      updateScreen()
      break
    case "DEL":
      del()
      updateScreen()
      break
    case "RESET":
      reset()
      updateScreen()
      break
    case "=":
      calcul(operation)
      updateScreen()
      break
    default:
      getNumber(target)
      updateScreen()
      break
  }
}

checker.addEventListener("change", getThemeChoice)
calcKeypad.addEventListener("click", getCalcType)
