const businesses = {
    maquinitas: {
        name: "Las Maquinitas",
        category: "Restaurante",
        location: "Ibagué, Tolima",
        rating: "4.8",
        reviews: "(45 reseñas)",

        description:
            "Comida rápida, coctelería, arcade y mucho más. Un espacio para compartir, disfrutar y vivir una experiencia diferente.",

        discount: "10%",

        discountCondition:
            "Válido en el establecimiento. Aplican términos y condiciones.",

        address:
            "Ibagué, Tolima, Colombia",

        mapName:
            "Las Maquinitas",

        maps:
            "#",

        images: [
            "img/negocios/maquinitas/logo-maquinitas.webp"
        ],

        features: [
            {
                icon: "fa-solid fa-gamepad",
                text: "Arcade"
            },
            {
                icon: "fa-solid fa-utensils",
                text: "Comida rápida"
            },
            {
                icon: "fa-solid fa-martini-glass",
                text: "Coctelería"
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("businessModal");
    const closeModal = document.getElementById("businessModalClose");
    const overlay = document.querySelector(".business-modal-overlay");

    const maquinitasCard = document.querySelector(
        '[data-business="maquinitas"]'
    );

    const mainImage = document.getElementById("businessMainImage");
    const currentImageText = document.getElementById("currentImage");
    const totalImagesText = document.getElementById("totalImages");
    const prevButton = document.getElementById("galleryPrev");
    const nextButton = document.getElementById("galleryNext");
    const thumbnails = document.querySelectorAll(".business-gallery-item");


    const images = [
        "img/negocios/maquinitas/logo-maquinitas.webp",
        "img/negocios/maquinitas/1.webp",
        "img/negocios/maquinitas/2.webp",
        "img/negocios/maquinitas/3.webp",
        "img/negocios/maquinitas/4.webp",
        "img/negocios/maquinitas/5.webp",
        "img/negocios/maquinitas/6.webp",
        "img/negocios/maquinitas/7.webp",
        "img/negocios/maquinitas/8.webp",
        "img/negocios/maquinitas/9.webp",
        "img/negocios/maquinitas/10.webp",
        "img/negocios/maquinitas/11.webp",
        "img/negocios/maquinitas/12.webp"
    ];


    let currentIndex = 0;


    function openModal() {

        if (!modal) return;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        currentIndex = 0;
        updateGallery();

    }


    function closeBusinessModal() {

        if (!modal) return;

        modal.classList.remove("active");
        document.body.style.overflow = "";

    }


    function updateGallery() {

        if (!mainImage) return;

        mainImage.src = images[currentIndex];

        if (currentImageText) {
            currentImageText.textContent = currentIndex + 1;
        }

        if (totalImagesText) {
            totalImagesText.textContent = images.length;
        }

        thumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove("active");
        });

        if (thumbnails[currentIndex]) {

            thumbnails[currentIndex].classList.add("active");

            thumbnails[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        }

    }


    /* ABRIR MODAL */

    if (maquinitasCard) {

        maquinitasCard.addEventListener("click", (event) => {

            /* No abrir si hace clic en el corazón */
            if (event.target.closest(".favorite")) {
                return;
            }

            openModal();

        });

    }


    /* CERRAR CON LA X */

    if (closeModal) {

        closeModal.addEventListener("click", () => {
            closeBusinessModal();
        });

    }


    /* CERRAR AL HACER CLIC FUERA */

    if (overlay) {

        overlay.addEventListener("click", () => {
            closeBusinessModal();
        });

    }


    /* IMAGEN SIGUIENTE */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            currentIndex++;

            if (currentIndex >= images.length) {
                currentIndex = 0;
            }

            updateGallery();

        });

    }


    /* IMAGEN ANTERIOR */

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }

            updateGallery();

        });

    }


    /* CLIC EN MINIATURAS */

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener("click", () => {

            currentIndex = Number(thumbnail.dataset.image);

            updateGallery();

        });

    });


    /* TECLAS */

    document.addEventListener("keydown", (event) => {

        if (!modal || !modal.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeBusinessModal();
        }

        if (event.key === "ArrowRight") {
            nextButton?.click();
        }

        if (event.key === "ArrowLeft") {
            prevButton?.click();
        }

    });

});

/* =========================================================
   ANUNCIOS DESTACADOS - DESLIZAMIENTO EN CELULAR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector("#descuentos .discounts-grid");
    if (!carousel) return;

    const mobile = window.matchMedia("(max-width: 700px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let initialScroll = 0;
    let dragging = false;
    let blockClickUntil = 0;

    carousel.setAttribute("tabindex", "0");
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-label", "Anuncios destacados. Desliza para ver más negocios.");

    carousel.addEventListener("pointerdown", (event) => {

        if (!mobile.matches || event.pointerType !== "mouse" || event.button !== 0) return;

        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        initialScroll = carousel.scrollLeft;
        dragging = false;
        blockClickUntil = 0;

    });

    window.addEventListener("pointermove", (event) => {

        if (event.pointerId !== pointerId) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (!dragging) {
            if (Math.abs(deltaX) < 6 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
            dragging = true;
            carousel.classList.add("is-dragging");
            carousel.setPointerCapture(pointerId);
        }

        event.preventDefault();
        carousel.scrollLeft = initialScroll - deltaX;

    }, { passive: false });

    function endDrag(event) {

        if (event && event.pointerId !== pointerId) return;

        const wasDragging = dragging;
        const previousPointer = pointerId;
        pointerId = null;
        dragging = false;
        carousel.classList.remove("is-dragging");

        if (previousPointer !== null && carousel.hasPointerCapture(previousPointer)) {
            carousel.releasePointerCapture(previousPointer);
        }

        if (wasDragging) {
            // Arrastrar las tarjetas no debe abrir la ventana del negocio.
            blockClickUntil = Date.now() + 350;
        }

    }

    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    carousel.addEventListener("lostpointercapture", endDrag);
    window.addEventListener("blur", () => endDrag());
    mobile.addEventListener("change", () => endDrag());

    carousel.addEventListener("click", (event) => {

        if (Date.now() < blockClickUntil) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

    }, true);

    carousel.addEventListener("dragstart", (event) => {
        if (mobile.matches) event.preventDefault();
    });

    carousel.addEventListener("keydown", (event) => {

        if (!mobile.matches || event.target !== carousel) return;
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

        event.preventDefault();
        const card = carousel.querySelector(".discount-card-item");
        const distance = card ? card.getBoundingClientRect().width + 16 : carousel.clientWidth;
        carousel.scrollBy({
            left: event.key === "ArrowRight" ? distance : -distance,
            behavior: reducedMotion.matches ? "auto" : "smooth"
        });

    });

});
