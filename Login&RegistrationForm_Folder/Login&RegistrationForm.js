const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.registration-form');

// Input validation functions
function validateEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Basic password strength check (you can enhance this)
  return password.length >= 8;
}

// Form submission functions
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Validate form data
  // Send data to server using AJAX or form submission
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Validate form data, including password match
  // Send data to server using AJAX or form submission
});

// Additional functions for password matching, error handling, etc.
const registerForm = document.querySelector('.registration-form');
const passwordInput = registerForm.querySelector('#password');
const confirmPasswordInput = registerForm.querySelector('#confirmPassword');

confirmPasswordInput.addEventListener('input', () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    // Display an error message
    confirmPasswordInput.setCustomValidity('Passwords do not match');
  } else {
    confirmPasswordInput.setCustomValidity('');
  }
});

function hashPassword(password) {
    // Simple hashing for demonstration purposes ONLY
    // Use a strong hashing library on the server
    return password.split('').reverse().join('');
  }

  // ... rest of your form submission logic

  // Example usage:
  const hashedPassword = hashPassword(passwordInput.value);
  // Send hashedPassword to the server for verification