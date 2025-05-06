const signInEndPoint = "https://learn.zone01kisumu.ke/api/auth/signin";
const form = document.getElementsByTagName("form")[0];
const errorDiv = document.getElementById("error");

const LoginUser = async (username, password) => {
    const credentials = btoa(`${username}:${password}`);

    try {
        const res = await fetch(signInEndPoint, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        const jsonRes = await res.json();

        if (!res.ok) {
            console.log(jsonRes);
           errorDiv.textContent = jsonRes.error || "Login failed.";
            return;
        } else {
            errorDiv.style.display = "none"
        }

        console.log("Login successful:", jsonRes);
    } catch (err) {
        console.error("Network or parsing error:", err);
        document.getElementById("error").textContent = "An unexpected error occurred.";
    }
};


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    LoginUser(userName, password)
})