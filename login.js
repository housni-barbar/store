document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(storedUser && storedUser.email === email && storedUser.password === password){
        showToast("✅ Login successful!", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        showToast("Your email or password is incorrect.");
    }
});
