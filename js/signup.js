// signup.js
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
      showToast("Signup successful!");

setTimeout(() => {
    window.location.href = "login.html";
}, 2000);

});
