# GraphQL Profile Page

A web-based profile interface powered by the [Zone01 Kisumu GraphQL API](https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql), allowing students to visualize their school journey through interactive SVG-based graphs and personalized data views.

---

## 📌 Objectives

This project aims to help you learn and apply **GraphQL** by building a personal profile dashboard that fetches real-time data from the Zone01 API.

You will:
- Authenticate using JWT.
- Query your personal academic data using GraphQL.
- Visualize your learning journey with custom SVG charts.
- Design and host a responsive and user-friendly profile page.

---

## 🧠 Key Concepts

- **GraphQL Queries** (standard, nested, and with arguments)
- **JWT Authentication** (via basic auth login)
- **Interactive UI & UX**
- **SVG-based Data Visualization**
- **Frontend Hosting (GitHub Pages, Netlify, etc.)**

---

## 🔐 Authentication Flow

1. **Login Page**:  
   Users sign in with either `username:password` or `email:password`.

2. **Token Retrieval**:  
   A POST request is made to:

using **Basic Auth** (base64 encoded) to receive a **JWT**.

3. **Accessing Data**:  
Use `Bearer <JWT>` in headers to authorize GraphQL requests and fetch personal data only.

4. **Logout**:  
The user can log out and invalidate the token client-side.

---

## 📄 Profile Page Requirements

Your profile UI **must** include:

### ✅ Required Sections

- At least **3 data points** (choose any):
- User basic info (login, ID)
- XP amount
- Grades
- Skills
- Audits

- **Statistics Section** with at least **2 SVG graphs**, for example:
- XP progression over time
- XP earned by project
- Audit pass/fail ratio
- Piscine stats
- Attempts per exercise

### 🎨 UI/UX

- Fully responsive layout
- SVG charts (custom or animated)
- Clear, structured, and intuitive design
- Error handling for login/auth issues

---

## 📊 Example GraphQL Queries

### 1. Basic Query (User ID & Login)
```graphql
{
user {
 id
 login
}
}
```
## 🛠️ Tech Stack

- **HTML / CSS / JavaScript**  
  Frontend technologies used to build and style the profile interface.

- **GraphQL**  
  Used to query structured data from the Zone01 API.

- **JWT Authentication**  
  Implements secure access to user-specific data via tokens.

- **SVG (Scalable Vector Graphics)**  
  Enables dynamic and interactive graphs to visualize progress and achievements.

- **[Zone01 GraphQL API](https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql)**  
  The main data source that powers the entire profile.

