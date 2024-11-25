document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // ��������� �������� ����� �����
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // ������� ��������� (����� �������� �������������� ��������)
    if (!name || !email || !message) {
        alert("����������, ��������� ��� ����.");
        return;
    }

    // ����� ����� �������� ������ ��� �������� �����, ��������, ����� API ��� �����.
    // ��� ������������ ������� ���������
    document.getElementById("form-message").innerText = "������� �� ���� ���������, �� ����� � ���� ��������!";
    
    // ������� ����� ����� ��������
    document.getElementById("contact-form").reset();
});


