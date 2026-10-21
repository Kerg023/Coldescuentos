const businesses = [

    {
        category: "Alimentación",
        names: [
            "Sabor de Casa",
            "Las Maquinitas",
            "Café Central",
            "Burger House",
            "Dulce Momento"
        ]
    },

    {
        category: "Educación",
        names: [
            "Aprende Más",
            "Educa Colombia",
            "Smart Academy",
            "English Pro",
            "Centro Saber"
        ]
    },

    {
        category: "Salud & Belleza",
        names: [
            "Belleza Natural",
            "Spa Vital",
            "Estética Luna",
            "Salud Integral",
            "Beauty Center"
        ]
    },

    {
        category: "Marketing",
        names: [
            "Creativamente",
            "2gether Media",
            "Pixel Studio",
            "Marketing Pro",
            "Brand Lab"
        ]
    },

    {
        category: "Hogar",
        names: [
            "Casa Ideal",
            "Hogar & Más",
            "Decora Home",
            "Todo Hogar",
            "Espacios"
        ]
    },

    {
        category: "Tecnología",
        names: [
            "Tech Colombia",
            "Digital Store",
            "Smart Tech",
            "Byte Solutions",
            "Tecno Center"
        ]
    },

    {
        category: "Moda & Estilo",
        names: [
            "Moda Urbana",
            "Style Shop",
            "Trend Colombia",
            "Fashion Point",
            "Look Perfecto"
        ]
    },

    {
        category: "Deportes",
        names: [
            "Sport Life",
            "Fit Center",
            "Gym Pro",
            "Active Store",
            "Zona Fitness"
        ]
    },

    {
        category: "Servicios",
        names: [
            "Soluciones Plus",
            "Servicios Express",
            "Ankora",
            "Pro Services",
            "Ayuda Total"
        ]
    }

];


const descriptions = {

    "Alimentación":
        "Disfruta productos deliciosos con descuentos especiales.",

    "Educación":
        "Aprende y desarrolla nuevas habilidades pagando menos.",

    "Salud & Belleza":
        "Cuida de ti con promociones exclusivas.",

    "Marketing":
        "Soluciones creativas para hacer crecer tu negocio.",

    "Hogar":
        "Encuentra productos y servicios para tu hogar.",

    "Tecnología":
        "Tecnología y soluciones digitales a mejores precios.",

    "Moda & Estilo":
        "Encuentra las últimas tendencias con descuentos.",

    "Deportes":
        "Todo para mantenerte activo y disfrutar del deporte.",

    "Servicios":
        "Servicios profesionales con beneficios exclusivos."

};


const locations = [
    "Ibagué",
    "Bogotá",
    "Medellín",
    "Cali",
    "Pereira"
];


const gradients = [
    "linear-gradient(135deg,#102b36,#24586a)",
    "linear-gradient(135deg,#252525,#555)",
    "linear-gradient(135deg,#345c45,#8aac72)",
    "linear-gradient(135deg,#111,#343434)",
    "linear-gradient(135deg,#31465c,#70839b)"
];


const discounts = [
    10,
    15,
    20,
    25,
    30
];


let allBusinesses = [];


businesses.forEach(group => {

    group.names.forEach((name, index) => {

        allBusinesses.push({

            name: name,

            category: group.category,

            description: descriptions[group.category],

            location: locations[index],

            discount: discounts[index],

            gradient: gradients[index],

            initial:
                name.charAt(0).toUpperCase()

        });

    });

});


const container =
    document.getElementById("discountsContainer");


const categoryTitle =
    document.getElementById("categoryTitle");


const resultsText =
    document.getElementById("resultsText");


const searchInput =
    document.getElementById("searchDiscount");


function renderBusinesses(list) {

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div class="no-results">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>
                    No encontramos resultados
                </h3>

                <p>
                    Prueba con otra búsqueda o categoría.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(business => {

        const card =
            document.createElement("article");


        card.className =
            "discount-card-item";


        card.innerHTML = `

            <div
                class="card-image demo-image"
                style="background:${business.gradient};"
            >

                <span>
                    ${business.initial}
                </span>

                <span class="discount-badge">
                    -${business.discount}%
                </span>

                <button
                    class="favorite"
                    type="button"
                >

                    <i class="fa-regular fa-heart"></i>

                </button>

            </div>


            <div class="card-content">

                <div class="business-type">
                    ${business.category}
                </div>


                <h3>
                    ${business.name}
                </h3>


                <p>
                    ${business.description}
                </p>


                <div class="card-bottom">

                    <span class="location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${business.location}

                    </span>


                    <span class="verified">

                        <i class="fa-solid fa-circle-check"></i>

                        Verificado

                    </span>

                </div>

            </div>

        `;


        container.appendChild(card);

    });


    setupFavorites();

}


function setupFavorites() {

    const buttons =
        document.querySelectorAll(".favorite");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const icon =
                    button.querySelector("i");


                icon.classList.toggle(
                    "fa-regular"
                );

                icon.classList.toggle(
                    "fa-solid"
                );

            }
        );

    });

}


function filterCategory(category) {

    let filtered;


    if (category === "Todas") {

        filtered =
            allBusinesses;

        categoryTitle.textContent =
            "Todos los negocios";

    } else {

        filtered =
            allBusinesses.filter(
                business =>
                    business.category === category
            );

        categoryTitle.textContent =
            category;

    }


    resultsText.textContent =
        `${filtered.length} descuentos disponibles`;


    renderBusinesses(filtered);

}


document
    .querySelectorAll(".category-filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".category-filter"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add("active");


                filterCategory(
                    button.dataset.category
                );


                searchInput.value = "";

            }
        );

    });


searchInput.addEventListener(
    "input",
    () => {

        const text =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            allBusinesses.filter(
                business =>

                    business.name
                        .toLowerCase()
                        .includes(text)

                    ||

                    business.category
                        .toLowerCase()
                        .includes(text)

                    ||

                    business.description
                        .toLowerCase()
                        .includes(text)

            );


        categoryTitle.textContent =
            text
                ? "Resultados de búsqueda"
                : "Todos los negocios";


        resultsText.textContent =
            `${filtered.length} descuentos disponibles`;


        renderBusinesses(filtered);

    }
);


document
    .querySelector(".subscription-form")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            alert(
                "¡Gracias por suscribirte a Coldescuentos!"
            );

        }
    );


renderBusinesses(allBusinesses);