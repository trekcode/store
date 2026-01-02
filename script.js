// Mock Product Data (replace with Amazon API later)
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Wireless Charger iPhone Charging Station: 3 in 1 Charger Stand Multiple Devices for Apple - iPhone 17 16e 16 15 14 Pro Max 13 12 11 - Watch 10 9 8 7 6 5 4 3 2 SE and Ultra Series - Airpods 4 3 Pro",
    price: "$59.99",
    category: "electronics",
    images: ["wireless.jpeg", "wireless2.jpg"],
    affiliateLink: "https://amzn.to/3N3PIQE"
  },
  {
    id: 2,
    title: "Smartwatch",
    description: "Track your fitness and notifications with this stylish smartwatch...",
    price: "$79.99",
    category: "electronics",
    images: ["https://via.placeholder.com/220x180?text=Smartwatch1", "https://via.placeholder.com/220x180?text=Smartwatch2"],
    affiliateLink: "#"
  },
  {
    id: 3,
    title: "Fiction Book",
    description: "A thrilling fiction book for your reading pleasure...",
    price: "$14.99",
    category: "books",
    images: ["https://via.placeholder.com/220x180?text=Book1"],
    affiliateLink: "#"
  },
  {
    id: 4,
    title: "Home Lamp",
    description: "Elegant home lamp to light up your room...",
    price: "$29.99",
    category: "home",
    images: ["https://via.placeholder.com/220x180?text=Lamp1", "https://via.placeholder.com/220x180?text=Lamp2"],
    affiliateLink: "#"
  },
  // Add more products as needed
];

// Global variables
let displayedProducts = 0;
const perLoad = 2; // products per Load More

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const searchInput = document.getElementById('search-input');
const categoryList = document.getElementById('category-list').querySelectorAll('li');

let currentCategory = "all";
let currentSearch = "";

// Functions
function displayProducts() {
  const filtered = products.filter(product => {
    const matchCategory = currentCategory === "all" || product.category === currentCategory;
    const matchSearch = product.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  const productsToShow = filtered.slice(displayedProducts, displayedProducts + perLoad);

  productsToShow.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";

    // Images carousel
    let imgHtml = `<div class="product-images">`;
    product.images.forEach((img, idx) => {
      imgHtml += `<img src="${img}" class="${idx === 0 ? 'active' : ''}" data-index="${idx}">`;
    });
    imgHtml += `</div>`;

    // Product info
    const infoHtml = `
      <div class="product-info">
        <h3>${product.title}</h3>
        <p class="description">${product.description.substring(0, 50)}... <span class="read-more">Read More</span></p>
        <div class="price-btn-container">
          <span class="price">${product.price}</span>
          <a href="${product.affiliateLink}" target="_blank" class="affiliate-btn">Buy</a>
        </div>
      </div>
    `;

    card.innerHTML = imgHtml + infoHtml;
    productsGrid.appendChild(card);

    // Carousel rotation
    const imgs = card.querySelectorAll('.product-images img');
    let currentImg = 0;
    setInterval(() => {
      imgs[currentImg].classList.remove('active');
      currentImg = (currentImg + 1) % imgs.length;
      imgs[currentImg].classList.add('active');
    }, 3000);

    // Read More toggle
    const readMore = card.querySelector('.read-more');
    const desc = card.querySelector('.description');
    readMore.addEventListener('click', () => {
      desc.textContent = product.description;
    });
  });

  displayedProducts += productsToShow.length;

  // Hide Load More if all products displayed
  if (displayedProducts >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Event Listeners
loadMoreBtn.addEventListener('click', displayProducts);

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  displayedProducts = 0;
  productsGrid.innerHTML = "";
  displayProducts();
});

categoryList.forEach(li => {
  li.addEventListener('click', () => {
    currentCategory = li.dataset.category;
    displayedProducts = 0;
    productsGrid.innerHTML = "";
    displayProducts();

    // Highlight active category
    categoryList.forEach(item => item.classList.remove('active'));
    li.classList.add('active');
  });
});

// Initial Display
displayProducts();
