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