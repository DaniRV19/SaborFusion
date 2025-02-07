"use strict";

const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');
const btn = document.querySelector('#login-btn');
const form = document.querySelector('#login-form');
const msg = document.querySelector('#msg');
        
btn.disabled = true;
        
function shiftButton() {
    showMsg();
    const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
    const currentPosition = positions.find(dir => btn.classList.contains(dir));
    if (currentPosition) {
        btn.classList.remove(currentPosition);
    }
    const newPosition = positions[Math.floor(Math.random() * positions.length)];
    btn.classList.add(newPosition);
}

function showMsg() {
    msg.textContent = "Rellena los campos para habilitar el botón";
}

function validateForm() {
    if (uname.value.trim() !== "" && pass.value.trim() !== "") {
        btn.disabled = false;
        msg.textContent = "";
    } else {
        btn.disabled = true;
    }
}
        
uname.addEventListener('input', validateForm);
pass.addEventListener('input', validateForm);
        
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita la recarga de la página
    window.location.href = "index.html"; // Redirige al index.html
});
