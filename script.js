document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Получение значений полей формы
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Простая валидация (можно добавить дополнительные проверки)
    if (!name || !email || !message) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Здесь можно добавить логику для отправки формы, например, через API или почту.
    // Для демонстрации выводим сообщение
    document.getElementById("form-message").innerText = "Спасибо за ваше сообщение, мы скоро с вами свяжемся!";
    
    // Очистка формы после отправки
    document.getElementById("contact-form").reset();
});


