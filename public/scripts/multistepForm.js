// Function to validate fields in the current step and show required messages in order of the fields
const validateStep = (stepNumber) => {
    let isValid = true;
    const currentStep = document.querySelector(`#step-${stepNumber}`);
    const requiredFields = Array.from(currentStep.querySelectorAll("[required]"));

    // Iterate through fields in the order they appear
    for (let field of requiredFields) {
        if (!field.value) {
            isValid = false;
            field.setCustomValidity("This field is required.");
            field.reportValidity(); // Show required message for the first invalid field

            // Focus the first invalid field to ensure the message appears in order
            field.focus();
            break; // Stop at the first invalid field to show the message in order
        } else {
            field.setCustomValidity(""); // Reset validation message for valid fields
        }
    }

    return isValid;
};

// Function to navigate to a form step
const navigateToFormStep = (stepNumber) => {
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });

    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });

    document.querySelector("#step-" + stepNumber).classList.remove("d-none");

    const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");

    for (let index = 0; index < stepNumber; index++) {
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        if (formStepCircle) {
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};

// Add event listeners to navigation buttons
document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        const currentStep = stepNumber - 1; // The current step to validate

        // Validate before moving to the next step
        if (stepNumber > 1 && !validateStep(currentStep)) {
            return; // If validation fails, don't move to the next step
        }

        navigateToFormStep(stepNumber);
    });
});

// Add event listener to submit button for the final form submission
document.querySelector(".submit-btn").addEventListener("click", (event) => {
    const finalStepNumber = 4; // The number of the last step, update this if needed

    // Validate the final step before submitting
    if (!validateStep(finalStepNumber)) {
        event.preventDefault(); // Prevent form submission if the final step is not valid
        return;
    }

    // If validation is successful, submit the form
    document.getElementById("userAccountSetupForm").submit();
});
