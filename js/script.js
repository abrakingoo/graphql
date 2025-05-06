import { graphql_query } from "./query.js";

const signInEndPoint = "https://learn.zone01kisumu.ke/api/auth/signin";
const graphQlEndpoint = "https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql";
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

        const json = await res.json();

        if (!res.ok) {
            errorDiv.textContent = json.error || "Login failed.";
            return { status: false, error: json.error };
        }

        errorDiv.style.display = "none";
        const data = await FetchUserData(json);
        return { status: true, data };

    } catch (err) {
        console.error("Network or parsing error:", err);
        errorDiv.textContent = "An unexpected error occurred.";
        return { status: false, error: "Unexpected error" };
    }
};

const FetchUserData = async (jwt) => {
    const res = await fetch(graphQlEndpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: graphql_query })
    });

    const resData = await res.json();
    console.log("Rsponse Data >>", resData)

    if (!res.ok) {
        errorDiv.textContent = resData.error || "Failed to fetch user data.";
        return null;
    }

    return resData;
};

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await LoginUser(userName, password);
    console.log("RESULTS: ", result)
    if (result.status) {
        localStorage.setItem("user", JSON.stringify(result.data));
        window.location.href = "./pages/dashboard.html";
    } else {
        console.log("Login failed:", result.error);
        errorDiv.textContent = result.error || "Login failed.";
    }
});
