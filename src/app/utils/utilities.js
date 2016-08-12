export function commifyNumber(number) {
  let numberString = number.toString();
  let numberArray = numberString.split('.');
  let wholeNumberString = numberArray[0];
  let newNumberString = '';
  for (let i = wholeNumberString.length; i >= 0; i--) {
    newNumberString = wholeNumberString.charAt(i) + newNumberString;
    let digitsToEnd = wholeNumberString.length - i;
    if (digitsToEnd % 3 === 0 && digitsToEnd > 0 && i > 0) newNumberString = ',' + newNumberString;
  }
  numberArray[0] = newNumberString;
  return numberArray.join('.');
}

export function isDefined(value) {
  return typeof value !== 'undefined';
}
