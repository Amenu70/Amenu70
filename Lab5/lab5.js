function max(x1, x2) {
    if (x1 > x2) return x1;
    else return x2;
}

function maxOfThree(x1, x2, x3) {
    return x1 > x2 ? (x1 > x3 ? x1 : x3) : (x2 > x3 ? x2 : x3);
}

function isVowel(character) {
    if (character == "a" || "e" || "i" || "o" || "u")
        return true;
    else    
        return false;
}
function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length;i++) {
        sum += array[i];
    }
    return sum;
}

function multiply(array) {
    let prod = 1;
    for (let i = 0; i < array.length;i++) {
        prod *= array[i];
    }
    return prod;
}

function reverse(string) {
    let reversedString = "";
    for (let i = string.length; i >= 0; i--){
        reversedString += string.charAt(i);
    }
    return reversedString;
}
function findLongestWord(array) {
    return array.map(item => item.length)
        .reduce((previous, current) => current > previous ? current : previous, 0);
}
function findLongestWords(array, number) {
    return array.filter(item => item.length > number);
}
function computeSumofSquares(array) {
    return array.map(item => item * item)
        .reduce((sum, current) => sum + current, 0);
}
function printOddNumbersOnly(array) {
    return array.filter(item => item % 2 != 0);
}
function computeSumofSquaresOfEvenOnly(array) {
    return array
        .filter(item => item % 2 == 0)
        .map(item => item * item)
        .reduce((sum, current) => sum + current, 0);
}
function sumfunctional(array) {
    return array.reduce((sum, current) => sum + current, 0);
}

function multiplyfunctional(array) {
    return array.reduce((prod, current) => prod *current, 1);
}
function printFibonacci(n, a, b) {
    var out = [a,b];
    for (let i = 0; i <n-2; i++){
        out.push((out[out.length - 1])+ (out[out.length - 2]));
    }
    return out;
}


