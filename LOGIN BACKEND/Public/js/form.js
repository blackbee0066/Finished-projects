const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100)
})

// Redirect to home if user is already logged in
window.onload = () => {
    console.log("Session Name at Login:", sessionStorage.name); // Debugging

    if (sessionStorage.name) {
        console.warn("User already logged in. Redirecting to home...");
        location.href = "/";
    }
};



//form validation

document.addEventListener("DOMContentLoaded", () => {
    const nameField = document.querySelector(".name"); 
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");

    const loginBtn = document.querySelector(".login-btn");
    const registerBtn = document.querySelector(".register-btn");

    // 🔹 Handle Login
    
    if (loginBtn) {
        loginBtn.addEventListener("click", async (event) => {
            event.preventDefault();
    
            const userData = {
                email: email.value,
                password: password.value
            };
    
            try {
                const response = await fetch("/login-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });
    
                const data = await response.json();
                console.log("Login Response:", data);
    
                if (response.ok) {
                    // ✅ Store the user's name in sessionStorage **before** redirecting
                    sessionStorage.setItem("name", data.user.name);
                    console.log("Session Storage Set:", sessionStorage.name);
    
                    // ✅ Redirect to the home page **only if sessionStorage is set**
                    if (sessionStorage.name) {
                        window.location.href = "/";
                    } else {
                        console.error("SessionStorage is not being set!");
                    }
                } else {
                    alert(data.message); // Show error message if login fails
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    
    // 🔹 Handle Register
    if (registerBtn) {
    registerBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        console.log("Register button clicked!"); // Debugging log

        const userData = {
            name: nameField?.value || "",  // Ensure name is included
            email: email.value.trim(),
            password: password.value.trim()
        };

        if (!userData.name || !userData.email || !userData.password) {
            alert("Please fill all fields!");
            return;
        }

        try {
            console.log("Sending register request:", userData); // Debugging log

            const response = await fetch("/register-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log("Register Response:", data);

            if (response.ok) {
                alert("Registration successful! Redirecting to login...");
                window.location.href = "/login"; // Redirect after registration
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error("Error:", error);
        }
        });
    }

});