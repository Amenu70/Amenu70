// Question 1
function max(x1, x2) {
    if (x1 > x2) return x1;
    else return x2;
}

// Question 2
function maxOfThree(x1, x2, x3) {
    return x1 > x2 ? (x1 > x3 ? x1 : x3) : (x2 > x3 ? x2 : x3);
}

// Question 3
function isVowel(character) {
    if (character == "a" || "e" || "i" || "o" || "u")
        return true;
    else    
        return false;
}

// Question 4
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

// Question 5
function reverse(string) {
    let reversedString = "";
    for (let i = string.length; i >= 0; i--){
        reversedString += string.charAt(i);
    }
    return reversedString;
}

// Question 6
function findLongestWord(array) {
    return array.map(item => item.length)
        .reduce((previous, current) => current > previous ? current : previous, 0);
}

// Question 7
function findLongestWords(array, number) {
    return array.filter(item => item.length > number);
}

// Question 8
function computeSumofSquares(array) {
    return array.map(item => item * item)
        .reduce((sum, current) => sum + current, 0);
}

// Question 9
function printOddNumbersOnly(array) {
    return array.filter(item => item % 2 != 0);
}

// Question 10
function computeSumofSquaresOfEvenOnly(array) {
    return array
        .filter(item => item % 2 == 0)
        .map(item => item * item)
        .reduce((sum, current) => sum + current, 0);
}

// Question 11
function sumfunctional(array) {
    return array.reduce((sum, current) => sum + current, 0);
}

function multiplyfunctional(array) {
    return array.reduce((prod, current) => prod *current, 1);
}


// Question 12
function printFibonacci(n, a, b) {
    var out = [a,b];
    for (let i = 0; i <n-2; i++){
        out.push((out[out.length - 1])+ (out[out.length - 2]));
    }
    return out;
}


