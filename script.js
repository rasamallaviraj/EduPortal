document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("authForm");
    
    if (authForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        const toggleLogin = document.getElementById("toggleLogin");
        const formTitle = document.getElementById("formTitle");
        const submitBtn = document.getElementById("submitBtn");
        const nameGroup = document.getElementById("nameGroup");
        const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
        const toggleText = document.getElementById("toggleText");

        let isLoginMode = false;

        // Toggle between Register and Login
        toggleLogin.addEventListener("click", (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                formTitle.textContent = "Login to EduPortal";
                nameGroup.style.display = "none";
                confirmPasswordGroup.style.display = "none";
                submitBtn.textContent = "Login";
                toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleLogin">Register here</a>';
            } else {
                formTitle.textContent = "Register for EduPortal";
                nameGroup.style.display = "flex";
                confirmPasswordGroup.style.display = "flex";
                submitBtn.textContent = "Submit";
                toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLogin">Login here</a>';
            }
            
            // Re-attach listener to newly created toggle link
            document.getElementById("toggleLogin").addEventListener("click", (e) => {
                e.preventDefault();
                toggleLogin.click();
            });
            
            clearErrors();
        });

        const clearErrors = () => {
            nameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
        };

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            clearErrors();
            let isValid = true;

            // Email validation (both modes)
            if (!emailInput.value.trim()) {
                emailError.textContent = "Email is required";
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = "Please enter a valid email format";
                isValid = false;
            }

            // Password validation (both modes)
            if (!passwordInput.value) {
                passwordError.textContent = "Password is required";
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = "Password must be at least 6 characters";
                isValid = false;
            }

            // Registration mode only validations
            if (!isLoginMode) {
                if (!nameInput.value.trim()) {
                    nameError.textContent = "Full name is required";
                    isValid = false;
                }
                
                if (!confirmPasswordInput.value) {
                    confirmPasswordError.textContent = "Please confirm your password";
                    isValid = false;
                } else if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordError.textContent = "Passwords do not match";
                    isValid = false;
                }
            }

            if (isValid) {
                if (isLoginMode) {
                    alert("Login successful! Welcome back.");
                } else {
                    alert("Registration successful! You can now log in.");
                    // Switch to login mode
                    toggleLogin.click();
                }
                authForm.reset();
            }
        });
    }

    // Contact Form simple alert
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your inquiry! We will get back to you soon.");
            contactForm.reset();
        });
    }
});
