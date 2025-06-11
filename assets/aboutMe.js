"use strict";

 // Animación de desvanecimiento para los textos al hacer scroll
 window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(element) {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});
