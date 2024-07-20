function playFizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++){
        let value = "";
        if (i % 3 === 0) {
            value =+ "Fizz";
        }
        if ( i % 5 === 0) {
            value += "Buzz";
        }
        if (value = "") {
            value = i.toString();
        }
        result.push(value)
    }
}
    return result





/*  option # 2
function playFizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
         } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0 ){
            result.push("Buzz");
         }  else {
            result.push(i.toString())
        }
    }
    return result
*/