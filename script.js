// Handling contact form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple form validation
    if (!name || !email || !message) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Display success message
    document.getElementById("form-message").innerText = "Спасибо за ваше сообщение, мы скоро с вами свяжемся!";
    document.getElementById("contact-form").reset();
});

// Toggle dark mode
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


