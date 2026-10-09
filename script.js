const products = [
  { name: "Яблоки красные", unit: "1 кг", price: 189, category: "fruit", emoji: "🍎", tint: "#e8d8ce", tag: "Хит" },
  { name: "Апельсины", unit: "1 кг", price: 249, category: "citrus", emoji: "🍊", tint: "#f0dfc7", tag: "Сочные" },
  { name: "Клубника", unit: "250 г", price: 329, category: "berries", emoji: "🍓", tint: "#ead7d1", tag: "Сезонное" },
  { name: "Авокадо", unit: "2 шт.", price: 299, category: "fruit", emoji: "🥑", tint: "#dce5ce", tag: "Спелое" },
  { name: "Лимоны", unit: "1 кг", price: 219, category: "citrus", emoji: "🍋", tint: "#ece8c8", tag: "Яркие" },
  { name: "Черника", unit: "125 г", price: 279, category: "berries", emoji: "🫐", tint: "#dcdce9", tag: "Свежая" },
  { name: "Бананы", unit: "1 кг", price: 169, category: "fruit", emoji: "🍌", tint: "#eee7cb", tag: "Сладкие" },
  { name: "Виноград", unit: "500 г", price: 349, category: "fruit", emoji: "🍇", tint: "#e0d9e8", tag: "Без косточек" }
];

const productGrid = document.querySelector("#product-grid");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const toast = document.querySelector(".toast");
let cartTotal = 0;
let toastTimeout;

function renderProducts(category = "all") {
  const visibleProducts = products.filter((product) => category === "all" || product.category === category);
  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-art" style="--product-tint: ${product.tint}">
        <span class="product-tag">${product.tag}</span>
        <span class="product-emoji" role="img" aria-label="${product.name}">${product.emoji}</span>
      </div>
      <div class="product-details">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-unit">${product.unit}</p>
          <span class="product-price">${product.price} ₽</span>
        </div>
        <button class="add-button" type="button" data-name="${product.name}" aria-label="Добавить: ${product.name}">+</button>
      </div>
    </article>
  `).join("");
}

document.querySelector(".filter-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  document.querySelectorAll(".filter-button").forEach((filter) => {
    const isActive = filter === button;
    filter.classList.toggle("is-active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts(button.dataset.category);
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  cartTotal += 1;
  cartCount.textContent = String(cartTotal);
  cartButton.setAttribute("aria-label", `Корзина, товаров: ${cartTotal}`);
  toast.textContent = `Добавлено в корзину: ${button.dataset.name}`;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
});

renderProducts();
