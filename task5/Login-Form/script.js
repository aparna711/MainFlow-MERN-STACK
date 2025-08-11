// Select container
const app = document.getElementById("app");

// Create form
const form = document.createElement("form");

// Heading
const heading = document.createElement("h2");
heading.textContent = "Login";
form.appendChild(heading);

// Email field
const emailLabel = document.createElement("label");
emailLabel.textContent = "Email:";
form.appendChild(emailLabel);

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter your email";
form.appendChild(emailInput);

// Password field
const passwordLabel = document.createElement("label");
passwordLabel.textContent = "Password:";
form.appendChild(passwordLabel);

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Enter your password";
form.appendChild(passwordInput);

// Login button
const loginBtn = document.createElement("button");
loginBtn.type = "button";
loginBtn.textContent = "Login";
form.appendChild(loginBtn);

// Append form to container
app.appendChild(form);

// Function to validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Event listener for login
loginBtn.addEventListener("click", () => {
  let valid = true;

  // Reset error styles
  [emailInput, passwordInput].forEach(input => input.classList.remove("error"));

  // Validate empty fields
  if (emailInput.value.trim() === "") {
    emailInput.classList.add("error");
    valid = false;
  }
  if (passwordInput.value.trim() === "") {
    passwordInput.classList.add("error");
    valid = false;
  }

  // Validate email format
  if (!isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add("error");
    alert("Please enter a valid email address.");
    valid = false;
  }

  // Validate password length
  if (passwordInput.value.trim().length < 6) {
    passwordInput.classList.add("error");
    alert("Password must be at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  // If valid, process login
  alert(`Email: ${emailInput.value}\nPassword: ${passwordInput.value}`);
});
