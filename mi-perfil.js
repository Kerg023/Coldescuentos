'use strict';

// Esta maqueta guarda únicamente datos del perfil; no autentica cuentas.
const profileStorageKey = 'coldescuentos.profile.demo.v1';
const profileForm = document.getElementById('profile-form');
const profileStatus = document.getElementById('profile-status');
let savedProfile = {};

try {
    const parsed = JSON.parse(localStorage.getItem(profileStorageKey) || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        savedProfile = parsed;
    }
    const email = sessionStorage.getItem('coldescuentos.demo.email');
    if (!savedProfile.correo && email) savedProfile.correo = email;
} catch {
    profileStatus.textContent = 'El navegador no permite leer los datos guardados.';
}

for (const field of profileForm.elements) {
    if (field.name && typeof savedProfile[field.name] === 'string') {
        field.value = savedProfile[field.name];
    }
}

function renderProfile(data) {
    const name = [data.nombres, data.apellidos].filter(Boolean).join(' ').trim();
    document.getElementById('profile-display-name').textContent = name || 'Tu perfil';
    document.getElementById('profile-display-email').textContent = data.correo || 'Completa tus datos';
    document.getElementById('profile-avatar').textContent = name ? name[0].toUpperCase() : 'C';
    document.getElementById('card-holder').textContent = name || 'Tu nombre aquí';
    document.getElementById('profile-greeting').textContent = data.nombres
        ? `¡Hola, ${data.nombres}!`
        : '¡Hola! ¿Qué quieres descubrir hoy?';
}

renderProfile(savedProfile);

profileForm.addEventListener('input', () => {
    profileStatus.textContent = 'Tienes cambios sin guardar.';
});

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('profile-name');
    name.setCustomValidity(name.value.trim() ? '' : 'Ingresa tus nombres.');
    name.addEventListener('input', () => name.setCustomValidity(''), { once: true });
    if (!profileForm.reportValidity()) return;

    const data = Object.fromEntries(
        [...new FormData(profileForm)].map(([key, value]) => [key, value.trim()])
    );

    try {
        localStorage.setItem(profileStorageKey, JSON.stringify(data));
        renderProfile(data);
        profileStatus.textContent = 'Cambios guardados en este navegador.';
    } catch {
        profileStatus.textContent = 'No se pudieron guardar los cambios. Revisa el almacenamiento del navegador.';
    }
    profileStatus.focus();
});

document.querySelectorAll('.profile-navigation a').forEach((link) => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.profile-navigation a').forEach((item) => {
            item.classList.remove('active');
        });
        link.classList.add('active');
    });
});

document.getElementById('profile-logout').addEventListener('click', () => {
    try {
        sessionStorage.removeItem('coldescuentos.demo.active');
        sessionStorage.removeItem('coldescuentos.demo.email');
    } catch {
        // La navegación sigue disponible aunque el almacenamiento esté bloqueado.
    }
    window.location.href = 'index.html';
});
