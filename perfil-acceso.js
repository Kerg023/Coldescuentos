'use strict';

// Acceso de demostración a Mi perfil. No valida ni guarda contraseñas.
(() => {
    const form = document.querySelector('.login-form');
    const enterButton = document.querySelector('.login-submit');
    if (!form || !enterButton) return;

    function openDemo(event) {
        event.preventDefault();
        const email = document.getElementById('login-email');
        if (email.value && !email.reportValidity()) return;
        try {
            sessionStorage.setItem('coldescuentos.demo.active', '1');
            sessionStorage.setItem('coldescuentos.demo.email', email.value.trim());
        } catch {
            // No se requiere almacenamiento para abrir la vista previa.
        }
        document.getElementById('login-password').value = '';
        window.location.href = 'mi-perfil.html';
    }

    enterButton.addEventListener('click', openDemo);
    form.addEventListener('submit', openDemo);
})();
