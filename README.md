# AllTails
AllTails provides pet owners with functionality to book a pet sitter for a wide range of pet types and engage with other pet owners in their community.

**FEATURES:**
- Join or host a pet event in your area
- Post about a topic you’d like to discuss with other pet owners
- Post about a service needed/offered
- Book a service (i.e., grooming, walking, boarding)

**TECH STACK:**
- React
- Express.js
- Node
- PostgreSQL
- HTML
- CSS
- MUI
- Heroku

# Table of Contents
- [Installation](#installation)
- [API](https://github.com/nugeulous/capstone/edit/bobadillamonica5-patch-1/README.md#api)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Known Issues and Areas for Improvement](#known-issues-and-areas-for-improvement)
- [Credits](#credits)

# Installation
Instructions for installation.
**Step 1 - Clone the repo by posting the following in your terminal:**

`git clone https://github.com/nugeulous/capstone.git`

`cd capstone`
  
<br>  
**Step 2 - Install dependencies:**

`npm install`

`npm install react react-dom`

`npm install redux react-redux`

`npm install @mui/material @emotion/react @emotion/styled`

`npm install @mui/icons-material`

`npm install express`


**POSTGRESQL**

Install PostgreSQL by downloading the installer from the PostgreSQL official website. Follow the installation instructions for your operating system.
After installation, you can use the `psql` command-line tool to interact with your PostgreSQL server.

**HEROKU**

Install the Heroku CLI (Command Line Interface). You can download it from the Heroku official website. Follow the instructions for your OS to log in.
After that, you can use the CLI to deploy your app by pushing it to a Heroku Git repository.
<br>
<br>  
**Step 3 - Create .env file and include the following:**

`VITE_API_URL=your_database_url`

`JWT_SECRET=your_jwt_secret`

`PORT = your_port`
<br>
<br>  
# Usage
**1 - Starting the app**

`npm run dev`  

**CLIENT:**

`Npm run client:dev`

**SERVER:**

`Npm run server:dev`

`Npm run seed`

<br>
<br>  

**2 - Logging in**

Open the [site link](https://alltails-23975acfa4a1.herokuapp.com/) and navigate to > My Account > Login > Input First Name, Last Name, Email, Phone Number, Address, Password
<br>
<br>  
**3 - Signing up**

Open the [site link](https://alltails-23975acfa4a1.herokuapp.com/) and navigate to > My Account > Register > Input Email and Password > Register
<br>
<br> 

**4 - Demo Account**
Open the [site link](https://alltails-23975acfa4a1.herokuapp.com/) and navigate to > My Account > Demo Login (below Sign In)
<br>
<br> 

# API

Documentation for API

**Base URL:**
`API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"`
<br>  

**Endpoints**
### POST
**1 - Register Owner**
- Method: `POST`
- URL: `/owners/register`
- Description: Creates a new owner account.
- Request Body:

```
{
  "fname": "John",
  "lname": "Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "phone": "123-456-7890",
  "password": "Password123!"
}
```

- Response (Success):
```
{
  "message": "Owner registered successfully",
  "owner": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

- Response (Error):
```
{
  "error": "Email already in use"
}
```
<br>  

**2 - Login Owner**
- Method: `POST`
- URL: `/owners/login`
- Description: Authenticates an owner and returns a JWT token.
- Request Body:
```
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

- Response (Success):
```
{
  "token": "jwt-token-here",
  "owner": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

- Response (Error):
```
{
  "error": "Invalid credentials"
}
```

**3 - Add Pet**
- Method: `POST`
- URL: `/pets/addPet`
- Description: Adds a new pet to the owner's account.
- Request Body: FormData with pet data (e.g., name, age, breed, etc.)
- Response (Success):
```
{
  "message": "Pet added successfully",
  "pet": {
    "id": 1,
    "name": "Buddy"
  }
}
```

**4 - Register Petsitter**
- Method: `POST`
- URL: `/petsitters/register`
- Description: Creates a new petsitter account.
- Request Body:
```
{
  "fname": "Jane",
  "lname": "Smith",
  "email": "jane@example.com",
  "address": "456 Park Ave",
  "phone": "987-654-3210",
  "password": "Password123!"
}
```

**5 - Login Petsitter**
- Method: `POST`
- URL: `/petsitters/login`
- Description: Authenticates a petsitter and returns a JWT token.
- Request Body:
```
{
  "email": "jane@example.com",
  "password": "Password123!"
}
```
<br>  

**6 - Create Comment**
- Method: `POST`
- URL: `/comments/createComment`
- Description: Creates a new comment on a post.
- Request Body:
```
{
  "postid": 1,
  "content": "I am interested!",
  "ownerid": 1,
  "petsitterid": 2
}
```
<br>

### GET
**1 - Fetch Owner Profile**
- Method: `GET`
- URL: `/owners/me`
- Description: Retrieves the authenticated owner's profile.
- Headers:
- Authorization: Bearer <JWT_TOKEN>
- Response (Success):
```
{
  "id": 1,
  "email": "john@example.com",
  "address": "123 Main St",
  "phone": "123-456-7890"
}
```

- Response (Error):
```
{
  "error": "Please log in or create an account!"
}
```
<br> 

**2 - Get Pet by ID**
- Method: `GET`
- URL: `/pets/{id}`
- Description: Retrieves a specific pet by its ID.
- Response (Success):
```
{
  "id": 1,
  "name": "Buddy",
  "age": 3,
  "breed": "Golden Retriever"
}
```
<br> 

**3 - Get Pets by Owner ID**
- Method: `GET`
- URL: `/pets/owner/{ownerId}`
- Description: Retrieves all pets belonging to a specific owner.
- Response (Success):
```
[
  {
    "id": 1,
    "name": "Buddy",
    "age": 3,
    "breed": "Golden Retriever"
  },
  {
    "id": 2,
    "name": "Max",
    "age": 5,
    "breed": "Labrador"
  }
]
```
<br>

**4 - Fetch Petsitter Profile**
- Method: `GET`
- URL: `/petsitters/me`
- Description: Retrieves the authenticated petsitter's profile.
- Headers:
- Authorization: Bearer <JWT_TOKEN>

**5 - Fetch Available Petsitters**
- Method: `GET`
- URL: `/availability/petsitters`
- Description: Retrieves a list of available petsitters.
Create Post
Method: POST
URL: /posts/createPost
Description: Creates a new post.
Request Body:
```
{
  "title": "Pet Sitting Offer",
  "content": "Available for pet sitting in NYC",
  "likes": 0,
  "ownerid": 1,
  "petsitterid": 2
}
```

**6 - Get All Posts**
- Method: `GET`
- URL: `/posts`
- Description: Retrieves all posts.

**7 - Fetch Orders by Owner ID**
- Method: `GET`
- URL: `/orders/{id}`
- Description: Retrieves all orders for a specific owner.

**8 - Get Petsitter by ID**
- Method: `GET`
- URL: `/petsitters/{id}`
- Description: Retrieves a specific petsitter by their ID.

**9 - Get Owner by ID**
- Method: `GET`
- URL: `/owners/{userId}`
- Description: Retrieves a specific owner by their ID.
<br>
<br>

# DELETE
**1 - Delete Post**
- Method: `DELETE`
- URL: `/posts/{postId}`
- Description: Deletes a specific post.

# Authentication
# Deployment
# Known Issues and Areas for Improvement
# Credits

