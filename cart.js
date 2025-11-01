// ========== تحميل السلة ==========
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cartTotal");

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-white-50">Your cart is empty.</p>`;
    cartTotal.textContent = "";
    return;
  }

  cart.forEach(product => {
    total += product.price;

    const div = document.createElement("div");
    div.classList.add("col-10", "col-sm-6", "col-md-4", "col-lg-3");
    div.innerHTML = `
      <div class="card bg-black text-white border-0 shadow">
        <img src="${product.image}" class="card-img-top rounded-3" height="300">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-white-50">$${product.price}</p>
          <button class="btn btn-outline-danger w-100 remove-btn" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  // المجموع الكلي + زر مسح السلة
  cartTotal.innerHTML = `
    <div class="d-flex flex-column align-items-center mt-4">
      <p class="fs-4 fw-bold text-warning mb-3">Total: $${total}</p>
      <button id="clearCart" class="btn btn-outline-light px-4">🗑 Clear Cart</button>
    </div>
  `;
}

// ========== حذف منتج واحد ==========
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.getAttribute("data-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // تأكد إن المقارنة صحيحة (نحوّل للـ string)
    let updatedCart = cart.filter(item => String(item.id) !== String(id));

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    loadCart(); // إعادة تحميل القائمة بعد الحذف
  }
});

// ========== مسح السلة بالكامل ==========
document.addEventListener("click", e => {
  if (e.target.id === "clearCart") {
    localStorage.removeItem("cart");
    loadCart();
  }
});

// ========== تحميل السلة عند فتح الصفحة ==========
loadCart();
cart.forEach(product => {
  if (product.id == "6") { // مثال: Shirt
    product.image = "images/sh"; // المسار الجديد
  }
});
