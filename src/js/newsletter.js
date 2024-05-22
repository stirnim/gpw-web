document.getElementById('sib-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        return response.json().then(function(data) {
            return {status: response.status, body: data};
        });
    }).then(function(result) {
        var responseMessageDiv = document.getElementById('response-message');
        var emailInputField = document.getElementById('EMAIL');
        if (result.status === 200 && result.body.success) {
            responseMessageDiv.style.color = 'green';
            responseMessageDiv.textContent = result.body.message || 'Ihre Anmeldung war erfolgreich.';
        } else {
            responseMessageDiv.style.color = 'red';
            var errorMessage = 'Die Anmeldung ist fehlgeschlagen.';
            responseMessageDiv.textContent = errorMessage;
        }
        responseMessageDiv.style.display = 'block';
        emailInputField.value = ''; // Clear the EMAIL input field
    }).catch(function(error) {
        var responseMessageDiv = document.getElementById('response-message');
        responseMessageDiv.style.color = 'red';
        responseMessageDiv.textContent = 'Die Anmeldung ist fehlgeschlagen.';
        responseMessageDiv.style.display = 'block';
        emailInputField.value = ''; // Clear the EMAIL input field
    });
});
