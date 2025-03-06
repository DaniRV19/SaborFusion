"use strict";

function validateForm() {
    let isValid = true;

    // Reset previous error messages
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    // Validate username
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (password.trim() === '') {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}
