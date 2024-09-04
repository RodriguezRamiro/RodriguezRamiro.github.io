function timeToWords(time) {
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr);
    let minute = parseInt(minuteStr);
    let period = hour >= 12 ? 'pm' : 'am';

    // Convert hour to 12-hour format
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    const hourWords = [
        "twelve", "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine", "ten", "eleven", "twelve"
    ];

    const minuteWords = [
        "oh", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
        "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];

    if (time === "00:00") return "midnight";
    if (time === "12:00") return "noon";

    let minuteInWords = "";

    if (minute === 0) {
        minuteInWords = "o’clock";
    } else if (minute < 10) {
        minuteInWords = `${minuteWords[0]} ${minuteWords[minute]}`;
    } else if (minute < 20) {
        minuteInWords = minuteWords[minute];
    } else {
        const tens = ["twenty", "thirty", "forty", "fifty"];
        minuteInWords = tens[Math.floor(minute / 10) - 2];
        if (minute % 10 !== 0) {
            minuteInWords += ` ${minuteWords[minute % 10]}`;
        }
    }

    return `${hourWords[hour]} ${minuteInWords} ${period}`;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const  
 timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;  

    const timeInWords = timeToWords(timeString);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateInWords = now.toLocaleDateString(undefined, dateOptions);

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${dateInWords} ${timeInWords}`;

    // Update countdown if it's active
    if (countdownInterval) {
        const remainingTime = countdownTarget - now;
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const  
 minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById('countdown');
        countdownElement.textContent  
 = `${days}d ${hours}h ${minutes}m ${seconds}s`;  

    }
}

let countdownTarget = null;
let countdownInterval = null;

document.getElementById('set-countdown').addEventListener('click', () => {
    const countdownInput = document.getElementById('countdown-time');
    const countdownTime = new Date(countdownInput.value);

    if (countdownTime > new Date()) {
        countdownTarget = countdownTime;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateClock, 1000);
    } else {
        alert("Please select a future time.");
    }
});


// Update the clock initially and then every second
updateClock();
setInterval(updateClock, 1000);

// Test cases
console.log(timeToWords("00:00")); // "midnight"
console.log(timeToWords("00:12")); // "twelve twelve am"
console.log(timeToWords("01:00")); // "one o’clock am"
console.log(timeToWords("06:01")); // "six oh one am"
console.log(timeToWords("06:10")); // "six ten am"
console.log(timeToWords("06:18")); // "six eighteen am"
console.log(timeToWords("06:30")); // "six thirty am"
console.log(timeToWords("10:34")); // "ten thirty four am"
console.log(timeToWords("12:00")); // "noon"
console.log(timeToWords("12:09")); // "twelve oh nine pm"
console.log(timeToWords("23:23")); // "eleven twenty three pm"
