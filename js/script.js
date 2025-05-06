import { graphql_query } from "./query.js";
const signInEndPoint = "https://learn.zone01kisumu.ke/api/auth/signin";
const graphQlEndpoint = "https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql";
const form = document.getElementsByTagName("form")[0];
const errorDiv = document.getElementById("error");

let jwt = "";

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
            console.log(json);
            errorDiv.textContent = json.error || "Login failed.";
            return;
        }

        jwt = json; 
        errorDiv.style.display = "none";
        // console.log("Login successful:", jwt);
        FetchUserData(jwt);

    } catch (err) {
        console.error("Network or parsing error:", err);
        errorDiv.textContent = "An unexpected error occurred.";
    }
};

const FetchUserData = async (jwt) => {
    const res = await fetch(graphQlEndpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"query" : graphql_query})
    });

    const resData = await res.json();

    if (!res.ok) {
        errorDiv.textContent = resData.error || "Failed to fetch user data.";
        return;
    }

    console.log("User Data: ", resData);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    LoginUser(userName, password);
});
