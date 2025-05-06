// dashboard.js
const user = JSON.parse(localStorage.getItem("user"))?.data?.user?.[0];
if (!user) {
    window.location.href = "../index.html";
} else {
    console.log("Logged in Usewr:>>> ", user)
    const login = user?.login;
    const id = user?.id;
    const attrs = user?.attrs;

    document.getElementById("user-login").textContent = login;
    document.getElementById("user-id").textContent = id;
    document.getElementById("user-attrs").textContent = JSON.stringify(attrs, null, 2);

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "../index.html";
    });
}
