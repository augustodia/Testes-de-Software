module.exports.sum = (n1, n2) => {
  let num1 = Number.parseInt(n1)
  let num2 = Number.parseInt(n2)

  if(isNaN(num1) || isNaN(num2)) {
    throw new Error('Please check your input. Some parameters is not be converted to number')
  }
  return num1 + num2;
}