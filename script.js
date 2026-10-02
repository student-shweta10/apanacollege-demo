document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const strengthText = document.getElementById("strengthText");
    const strengthBars = document.querySelectorAll(".strength-bars span");


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    function setupPasswordToggle(button, input) {

        button.addEventListener("click", function () {

            const icon = button.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("bi-eye");
                icon.classList.add("bi-eye-slash");

            } else {

                input.type = "password";

                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");

            }

        });

    }

    setupPasswordToggle(togglePassword, password);
    setupPasswordToggle(toggleConfirmPassword, confirmPassword);


    /* =========================================
       PASSWORD STRENGTH
    ========================================= */

    password.addEventListener("input", function () {

        const value = password.value;

        let strength = 0;

        if (value.length >= 8) {
            strength++;
        }

        if (/[A-Z]/.test(value)) {
            strength++;
        }

        if (/[0-9]/.test(value)) {
            strength++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
            strength++;
        }


        const colors = [
            "#ef4444",
            "#f97316",
            "#eab308",
            "#22c55e"
        ];


        strengthBars.forEach(function (bar, index) {

            if (index < strength) {
                bar.style.background = colors[strength - 1];
            } else {
                bar.style.background = "#e5e7eb";
            }

        });


        if (value.length === 0) {

            strengthText.textContent = "Weak";
            strengthText.style.color = "#ef4444";

        } else if (strength === 1) {

            strengthText.textContent = "Weak";
            strengthText.style.color = "#ef4444";

        } else if (strength === 2) {

            strengthText.textContent = "Fair";
            strengthText.style.color = "#f97316";

        } else if (strength === 3) {

            strengthText.textContent = "Good";
            strengthText.style.color = "#eab308";

        } else {

            strengthText.textContent = "Strong";
            strengthText.style.color = "#22c55e";

        }

    });


    /* =========================================
       PASSWORD MATCH
    ========================================= */

    confirmPassword.addEventListener("input", checkPasswordMatch);

    function checkPasswordMatch() {

        if (confirmPassword.value === "") {
            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.remove("is-valid");
            return false;
        }

        if (password.value !== confirmPassword.value) {

            confirmPassword.classList.add("is-invalid");
            confirmPassword.classList.remove("is-valid");

            return false;

        } else {

            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.add("is-valid");

            return true;

        }

    }


    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    const email = document.getElementById("email");

    email.addEventListener("input", function () {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(email.value)) {

            email.classList.remove("is-invalid");
            email.classList.add("is-valid");

        } else {

            email.classList.remove("is-valid");

        }

    });


    /* =========================================
       FORM SUBMIT
    ========================================= */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        event.stopPropagation();


        const fullName =
            document.getElementById("fullName");

        const terms =
            document.getElementById("terms");


        let isValid = true;


        /* Name */

        if (fullName.value.trim().length < 2) {

            fullName.classList.add("is-invalid");

            isValid = false;

        } else {

            fullName.classList.remove("is-invalid");
            fullName.classList.add("is-valid");

        }


        /* Email */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            email.classList.add("is-invalid");

            isValid = false;

        } else {

            email.classList.remove("is-invalid");
            email.classList.add("is-valid");

        }


        /* Password */

        if (password.value.length < 8) {

            password.classList.add("is-invalid");

            isValid = false;

        } else {

            password.classList.remove("is-invalid");
            password.classList.add("is-valid");

        }


        /* Confirm Password */

        if (!checkPasswordMatch()) {

            isValid = false;

        }


        /* Terms */

        if (!terms.checked) {

            terms.classList.add("is-invalid");

            isValid = false;

        } else {

            terms.classList.remove("is-invalid");

        }


        /* Success */

        if (isValid) {

            const successModal =
                new bootstrap.Modal(
                    document.getElementById("successModal")
                );

            successModal.show();

            // Demo only:
            // In a real application, send the data
            // to your backend/API here.

            console.log({
                name: fullName.value,
                email: email.value
            });

            form.reset();

            strengthBars.forEach(function (bar) {
                bar.style.background = "#e5e7eb";
            });

            strengthText.textContent = "Weak";
            strengthText.style.color = "#ef4444";

            document.querySelectorAll(".is-valid")
                .forEach(function (element) {
                    element.classList.remove("is-valid");
                });

        }

    });

});
