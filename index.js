(function () {
    const authLinks = document.getElementById('authLinks');

    const products = [
        { id: 1, name: "Hoodie", price: 45, image: "images/hoodies.jpg" },
        { id: 2, name: "Sweatshirt", price: 38, image: "images/Sweatshirts.jpg" },
        { id: 3, name: "T-Shirt", price: 20, image: "images/T-Shirts.jpg" },
        { id: 4, name: "Polo Shirt", price: 30, image: "images/polo.jpg" },
        { id: 5, name: "Jacket", price: 55, image: "images/jacket.jpg" },
        { id: 6, name: "shirt", price: 40, image: "images/shirt.jpg" }
        , { id: 7, name: "Casual Shoes", price: 25, image: "images/Shoes.jpg" }
        , { id: 8, name: "Sport Shoes", price: 30, image: "images/shosee.jpg" }
        , { id: 9, name: "Sneakers", price: 18, image: "images/shoseee.jpg" }
        , { id: 10, name: "Formal Shoes", price: 16, image: "images/shoseeee.jpg" }
        , { id: 11, name: "Boots", price: 22, image: "images/shoseeeee.jpg" }
        , { id: 12, name: "Loafers", price: 32, image: "images/shoseeeeee.jpg" },
        { id: 13, name: "Jeans", price: 18, image: "images/pantalon.jpg" },
        { id: 14, name: "Chinos", price: 22, image: "images/pantt.jpg" },
        { id: 15, name: "Cargo Pants", price: 16, image: "images/pa.jpg" },
        { id: 16, name: "Dress Pants", price: 32, image: "images/pante.jpg" },
        { id: 17, name: "Joggers", price: 42, image: "images/pants.jpg" },
        { id: 18, name: "Shorts", price: 12, image: "images/shorts.jpg" }
    ];

    function getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    function renderNavbar() {
        const user = getCurrentUser();
        authLinks.innerHTML = '';

        if (user) {
            authLinks.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link disabled">Welcome, ${user.username}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="#" id="logoutBtn">Logout</a>
                </li>
            `;
            document.getElementById('logoutBtn').addEventListener('click', logoutUser);
        } else {
            authLinks.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="signup.html">Signup</a>
                </li>
            `;
        }
    }

    function logoutUser() {
        localStorage.removeItem('user');
        window.location.href = "index.html";
    }

    function addToCart(productId) {
        const user = getCurrentUser();
        if (!user) {
            showToast("Please login first!", "error");
            setTimeout(() => window.location.href = "login.html", 1500);
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        showToast(`🛒 ${product.name} added to cart!`, "success");
    }


    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCountElement = document.getElementById("cartCount");
        if (cartCountElement) cartCountElement.textContent = cart.length;
    }

    function initCartButtons() {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                addToCart(id);
            });
        });
    }

    function showToast(message, type = "success") {
        const container = document.getElementById("toastContainer");
        const toast = document.createElement("div");

        toast.textContent = message;
        toast.style.background = type === "success" ? "#198754" : "#dc3545";
        toast.style.color = "white";
        toast.style.padding = "12px 18px";
        toast.style.marginTop = "10px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.4s ease";

        container.appendChild(toast);

        // عرض التوست
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(0)";
        }, 100);

        // إخفاؤه بعد 3 ثواني
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // تشغيل كل الوظائف عند التحميل
    renderNavbar();
    updateCartCount();
    initCartButtons();

})();

// Get cart items
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");

if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-white-50">Your cart is empty.</p>`;
} else {
    cart.forEach(product => {
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
}

// Remove from cart
document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
        const id = e.target.getAttribute("data-id");
        let updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        location.reload();
    }
});
