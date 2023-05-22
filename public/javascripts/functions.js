// const form = document.getElementById("article-form");
// form.addEventListener("submit", validateForm);

// function validateForm(event) {
//   event.preventDefault(); // Prevent the form from submitting

//   // Clear previous error messages
//   clearErrorMessages();

//   // Get form inputs
//   const titleInput = document.getElementById("title");
//   const descriptionInput = document.getElementById("description");
//   const thumbnailInput = document.getElementById("thumbnail");
//   const imagesInput = document.getElementById("images");
//   const contentInput = document.getElementById("content");
//   const authorInput = document.getElementById("author");

//   // Validate each input
//   let isValid = true;

//   if (titleInput.value.trim() === "") {
//     displayErrorMessage(titleInput, "Title is required");
//     isValid = false;
//   }

//   if (descriptionInput.value.trim() === "") {
//     displayErrorMessage(descriptionInput, "Description is required");
//     isValid = false;
//   }

//   // Add validation for other inputs here...

//   // Submit the form if all inputs are valid
//   if (isValid) {
//     form.submit();
//   }
// }

// // Function to display error message
// function displayErrorMessage(inputElement, errorMessage) {
//   const errorDiv = document.createElement("div");
//   errorDiv.className = "error";
//   errorDiv.textContent = errorMessage;
//   inputElement.parentNode.appendChild(errorDiv);
// }

// // Function to clear error messages
// function clearErrorMessages() {
//   const errorMessages = document.querySelectorAll(".error");
//   errorMessages.forEach((errorMessage) => errorMessage.remove());
// }

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
