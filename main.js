const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const navSearch = document.getElementById("nav-search");

navSearch.addEventListener("click", (e) => {
  navSearch.classList.toggle("open");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: "1000",
};

ScrollReveal().reveal(".header__img img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header__content div", {
  duration: 1000,
  delay: 500,
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".deals__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about__img img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval:500,
  delay: 500,
});

// Función para generar un precio aleatorio entre 10 y 50
function generateRandomPrice() {
  return (Math.random() * (50 - 10) + 10).toFixed(2); // Precio entre $10 y $50
}

async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${query}&limit=9`; // Limitar a 9 libros

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Ver la respuesta en la consola
    renderBooks(data.docs); // Renderizar los libros
  } catch (error) {
    console.error("Error al obtener los libros:", error);
  }
}

function renderBooks(books) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos libros

  // Limitar a 9 libros (por si acaso la API devuelve más)
  const limitedBooks = books.slice(0, 9);

  limitedBooks.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("product__card");

    const title = book.title;
    const authors = book.author_name
      ? book.author_name.join(", ")
      : "Autor desconocido";
    const coverId = book.cover_i;
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://via.placeholder.com/150"; // Imagen por defecto si no hay portada
    const price = generateRandomPrice(); // Precio aleatorio

    bookCard.innerHTML = `
      <h4>${title}</h4>
      <p>${authors}</p>
      <p>Precio: $${price}</p>
      <img src="${coverUrl}" alt="${title}" />
    `;

    productGrid.appendChild(bookCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks("clasicos"); // Cambia "clasicos" por la búsqueda que desees
});

const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});