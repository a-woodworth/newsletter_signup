const signupDiv = document.querySelector('.signup');
const successDiv = document.querySelector('.wrapper--success');
const signupForm = document.querySelector('.newsletter__form');
const emailInput = signupForm.elements.email;
const emailError = document.querySelector('#email-error');
const successEmail = document.querySelector('.success__email');
const dismissBtn = successDiv.querySelector('.btn');

function handleSuccessMessageExit() {
  // Hide success message
  successDiv.classList.add('hidden');
  // Show signup form & reset form
  signupDiv.classList.remove('hidden');
  signupForm.reset();
  // Add atribute so screen readers know page has changed
  signupDiv.setAttribute('tabindex', '-1');
  signupDiv.focus();
}

function removeEmailError() {
  // Update aria attributes
  emailInput.setAttribute('aria-invalid', 'false');
  emailInput.removeAttribute('aria-live', 'polite');

  // Show error message
  emailError.classList.add('hidden');
}

function showEmailError() {
  // Update aria attributes
  emailInput.setAttribute('aria-invalid', 'true');
  emailInput.setAttribute('aria-live', 'polite');

  // Show error message
  emailError.classList.remove('hidden');
}

function validateForm(e) {
  e.preventDefault();
  const validForm = signupForm.checkValidity();

  if (!validForm) {
    // Email input is invalid - cancel submit and show error
    showEmailError();
    emailInput.focus();
  } else {
    // Email input is valid, proceed with form submission
    // For demo, just logging the email
    const formData = new FormData(signupForm);
    const email = formData.get('email');
    console.log('Form submitted with email:', email);

    // Show success message
    signupDiv.classList.add('hidden');
    successEmail.textContent = emailInput.value;
    successDiv.classList.remove('hidden');
  }
}

// Show email error when exiting input
emailInput.addEventListener('blur', () => {
  const validEmail = emailInput.checkValidity();

  if (!validEmail) {
    showEmailError();
  }
});

// Check for email error correction
emailInput.addEventListener('input', () => {
  const validEmail = emailInput.checkValidity();

  if (validEmail) {
    removeEmailError();
  }
});

// Validate form on submit
signupForm.addEventListener('submit', (e) => {
  validateForm(e);
});

// Dismiss success message
dismissBtn.addEventListener('click', () => {
  handleSuccessMessageExit();
});
