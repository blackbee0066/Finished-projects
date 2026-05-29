const greeting = document.querySelector('.greeting'); 

window.onload = () => {
    console.log("Session Name at Home:", sessionStorage.name); // Debugging

    if (!sessionStorage.name) {
        console.warn("User not logged in. Redirecting to login...");
        location.href = "/login";
    } else {
        document.querySelector('.greeting').innerHTML = `Hello ${sessionStorage.name}`;
    }
};


// 🔹 Handle Logout
//This code handles the logout functionality for the user. When the user clicks the logout button, the sessionStorage is cleared and the page is reloaded.

const logOut = document.querySelector('.logout'); 

logOut.onclick = () => { 
    sessionStorage.clear(); 
    location.reload(); 
}
