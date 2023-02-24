const checker = document.querySelector("[data-checker]")
const calculator = document.querySelector("[data-calculator]")
const calcKeypad = document.querySelector("[data-calc-keypad]")

const chosen_1_Operand = document.querySelector("[data-chosen-first-operand]")
const chosen_2_Operand = document.querySelector("[data-chosen-second-operand]")
const operandType = document.querySelector("[data-operand-type]")
const typingNum = document.querySelector("[data-typing-num]")
const calcEquals = document.querySelector("[data-calc-equals]")

let firstOperands = []
let secondOperands = []
let operation = undefined

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

function getNum(num) {
  if (operation === undefined) {
    if (!firstOperands.includes(".") || num !== ".") firstOperands.push(num)
  } else {
    if (!secondOperands.includes(".") || num !== ".") secondOperands.push(num)
  }

  chosen_1_Operand.textContent = firstOperands.join("")
  chosen_2_Operand.textContent = secondOperands.join("")
  typingNum.textContent =
    operation === undefined ? firstOperands.join("") : secondOperands.join("")
}

function getOperation(operationType) {
  if (operationType === "=") return

  operandType.textContent = operationType
  return operationType
}

function getCalcType(e) {
  if (e.target.classList.contains("calc-keypad")) return
  if (e.target.classList.contains("keypad")) return

  const target = e.target.textContent

  switch (target) {
    case "+":
      operation = getOperation(target)
      break
    case "-":
      operation = getOperation(target)
      break
    case "x":
      operation = getOperation(target)
      break
    case "/":
      operation = getOperation(target)
      break
    case "DEL":
      del()
      break
    case "RESET":
      reset()
      break
    case "=":
      calcResult(operation)
      break
    default:
      getNum(target)
      break
  }
}

function calcResult(ope) {
  if (ope === "+") addition()
  if (ope === "-") soustraction()
  if (ope === "x") mutiplication()
  if (ope === "/") division()
}

function addition() {
  const firstOpt = firstOperands.join("")
  const secondOpt = secondOperands.join("")

  calcEquals.textContent = "="
  typingNum.textContent = Number(firstOpt) + Number(secondOpt)
}

function soustraction() {
  const firstOpt = firstOperands.join("")
  const secondOpt = secondOperands.join("")

  calcEquals.textContent = "="
  typingNum.textContent = Number(firstOpt) - Number(secondOpt)
}

function mutiplication() {
  const firstOpt = firstOperands.join("")
  const secondOpt = secondOperands.join("")

  calcEquals.textContent = "="
  typingNum.textContent = Number(firstOpt) * Number(secondOpt)
}

function division() {
  const firstOpt = firstOperands.join("")
  const secondOpt = secondOperands.join("")

  calcEquals.textContent = "="
  typingNum.textContent = Number(firstOpt) / Number(secondOpt)
}

function del() {
  operation === undefined ? firstOperands.pop() : secondOperands.pop()

  const firstOpt = firstOperands.join("")
  const secondOpt = secondOperands.join("")

  calcEquals.textContent = ""
  chosen_1_Operand.textContent = firstOpt
  chosen_2_Operand.textContent = secondOpt

  typingNum.textContent =
    operation === undefined ? Number(firstOpt) : Number(secondOpt)
}

function reset() {
  firstOperands = []
  secondOperands = []
  operation = undefined

  typingNum.textContent = "0"
  calcEquals.textContent = ""
  operandType.textContent = ""
  chosen_1_Operand.textContent = ""
  chosen_2_Operand.textContent = ""
}

checker.addEventListener("change", getThemeChoice)
calcKeypad.addEventListener("click", getCalcType)
