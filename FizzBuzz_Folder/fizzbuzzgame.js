// script.js
document.getElementById('fizzBuzzForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const number = parseInt(document.getElementById('numberInput').value);
    const resultElement = document.getElementById('result');

    if (isNaN(number) || number < 1) {
        resultElement.textContent = 'Please enter a valid number greater than 0.';
        return;
    }

    let result = '';

    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result += 'FizzBuzz, ';
        } else if (i % 3 === 0) {
            result += 'Fizz, ';
        } else if (i % 5 === 0) {
            result += 'Buzz, ';
        } else {
            result += i + ', ';
        }
    }

    // Remove trailing comma and space
    result = result.slice(0, -2);

    resultElement.textContent = result;
});
