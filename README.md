# AllTails
AllTails provides pet owners with functionality to book a pet sitter for a wide range of pet types and engage with other pet owners in their community.

**FEATURES:**
- Join or host a pet event in your area
- Post about a topic you’d like to discuss with other pet owners
- Post about a petcare service needed / offered
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
- [Known Issues and Future Enhancements](#known-issues-and-future-enhancements)
- [Credits](#credits)

# Installation
Instructions for installation.

<br>

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
<br>

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

Open the [site link](https://alltails-23975acfa4a1.herokuapp.com/) and navigate to > My Account > Login > Input First Name, Last Name, Email, Phone Number, Address, Password > Sign In
<br>
<br>  
**3 - Signing up**

Open the [site link](https://alltails-23975acfa4a1.herokuapp.com/) and navigate to > My Account > Register > Input Email and Password > Sign Up
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

### **Endpoints**
## POST
**1 - Register as an Owner**
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

**2 - Login as an Owner**
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
- URL: `/pets/addPet`
- Description: Adds a new pet to the owner's account.
- Request Body:
```
{
  name: "Buddy",
  age: 3,
  gender: "Male",
  breed: "Golden Retriever",
  animalType: "Dog",
  weight: 30,
  file: null,
  sterile: true,
  favoriteToy: "Tennis Ball",
  favoriteTreat: "Peanut Butter",
  personality: "Playful and friendly",
  ownerId: "12345"
}
```
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
- URL: `/petsitters/register`
- Description: Creates a new petsitter account.
- Request Body:
```
{
  "name": "Jane",
  "age": "2",
  "gender": "female",
  "address": "456 Park Ave",
  "breed": "GSP",
  "animalType": "dog",
  "weight": "100 lbs",
  "file": "0000011010010101010101010101",
  "sterile": "Yes",
  "favoriteToy": "Bone",
  "favoriteTreat": "Bacon",
  "personality": "crazy gal!",
  "ownerId": "3"
}
```

**5 - Login as a Petsitter**
- URL: `/petsitters/login`
- Description: Authenticates a petsitter and returns a JWT token.
- Request Body:
```
{
  "email": "jane@example.com",
  "password": "Password123!"
}
```
- Response (Success):
```
{
  "token": "jwt-token-here",
  "petsitter": {
    "id": 1,
    "email": "john@example.com"
  }
}
```
<br>  

**6 - Create Comment**
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

**7 - Create Post**
- URL: `/posts/createPost`
- Description: Creates a new post.
- Request Body:
```
{
  "title": "Pet Sitting Offer",
  "content": "Available for pet sitting in NYC",
  "likes": 0,
  "ownerid": 1,
  "petsitterid": 2
}
```

## GET
**1 - Fetch Owner Profile**
- URL: `/owners/me`
- Description: Retrieves the authenticated owner's profile.
- Headers:
  - Authorization: Bearer <INSERT_JWT_TOKEN>
- Response (Success):
```
{
  "id": 1,
  "email": "john@example.com",
  "fname": "John",
  "lname": "Doe",
  "address": "123 Main St",
  "phone": "123-456-7890",
  ...
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
- URL: `/pets/{id}`
- Description: Retrieves a specific pet by its ID.
- Response (Success):
```
{
    "id": 1,
    "name": "Miss Thang",
    "animalType": "Cat",
    "breed": "Tabby",
    "age": "3",
    ...
}
```
<br> 

**3 - Get Pets by Owner ID**
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
    ...
  },
  {
    "id": 2,
    "name": "Max",
    "age": 5,
    "breed": "Labrador"
    ...
  }
]
```
<br>

**4 - Fetch Petsitter Profile**
- URL: `/petsitters/me`
- Description: Retrieves the authenticated petsitter's profile.
  - Header:
    - Authorization: Bearer <JWT_TOKEN>
- Response (Success):
```
{
  "id": 1,
  "email": "sammy@gmail.com",
  "fname": "Samuel",
  "lname": "Jackson",
  "address": "Sactown, CA",
  "phone": "916-432-7811",
  ...
}
```

**5 - Fetch Available Petsitters**
- URL: `/availability/petsitters`
- Description: Retrieves a list of available petsitters.
- Response (Success):
```
[
  {
    "id": 1,
    "fname": "Samuel",
    "lname": "Jackson",
    "dogs": true,
    "cats": true,
    "hourlyCost": 15,
    ...
  },
  {
    "id": 2,
    "fname": "Bea",
    "lname": "Joe",
    "dogs": true,
    "cats": false,
    "hourlyCost": 22,
    ...
  }
]
```

**6 - Get All Posts**
- URL: `/posts`
- Description: Retrieves all posts.
- Response (Success):
```
[
  {
    "id": 1,
    "title": "Welcome to the Pet Lovers Community!",
    "content": "We're thrilled to welcome you...",
    "likes": 100,
    ...
  },
  {
    "id": 2,
    "title": "Tips for a Healthy Cat Diet",
    "content": "Here are some tips to ensure...",
    "likes": 12,
    ...
  }
]
```

**7 - Fetch Orders by Owner ID**
- URL: `/orders/{id}`
- Description: Retrieves all orders for a specific owner.
- Response (Success):
```
[
  {
    "id": 1,
    "service_type": "Walk",
    "start_date": "10/10/2024",
    "price": "$4200",
    ...
  },
  {
    "id": 2,
    "service_type": "Groom",
    "start_date": "10/11/2024",
    "price": "$9001",
    ...
  }
]
```

**8 - Get Petsitter by ID**
- URL: `/petsitters/{id}`
- Description: Retrieves a specific petsitter by their ID.
- Response (Success):
```
{
  "id": 1,
  "fname": "Samuel",
  "lname": "Jackson",
  "address": "Sactown, CA",
  "dogs": true,
  "cats": true,
  ...
}
```

**9 - Get Owner by ID**
- URL: `/owners/{userId}`
- Description: Retrieves a specific owner by their ID.
- Response (Success):
  
```
{
  "id": 1,
  "fname": "John",
  "lname": "Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "phone": "123-456-7890",
  ...
}
```

<br>  

## DELETE
**1 - Delete Post**
- URL: `/posts/{postId}`
- Description: Deletes a specific post.
- Response (Success):
```
{
  "message": "Post deleted successfully."
}
```

<br>
<br> 

# Authentication

JWT Tokens are required for protected endpoints such as fetching user profiles, available petsitters, etc. Include the JWT token in the Authorization header of the request as follows:

`Authorization: Bearer <INSERT_JWT_TOKEN>`

<br>
<br>  

# Deployment

**Production URL:** [https://alltails-23975acfa4a1.herokuapp.com/](https://alltails-23975acfa4a1.herokuapp.com/)

**Deployment Instructions:** See [Installation](#installation) > POSTGRESQL > HEROKU

<br>
<br>  
# Known Issues and Future Enhancements

- **API Error Handling**: Implement more thorough error handling for all API calls. Currently, error responses are only created for a subset of API interactions.
- **Data Formatting**: Standardize all data formatting to use camelCase. Some fields are still using snake_case.
- **Logout Confirmation**: Add a confirmation page to confirm successful logout and improve the user experience.
- **Booking Time Granularity**: Enhance the booking service by adding more detailed start time, end time, and date options to improve flexibility.
- **HTML Optimization**: Refactor HTML to replace IDs with classes for improved scalability and maintainability.
- **Redux Implementation**: Expand the use of Redux throughout the entire application; currently, it is only implemented in the booking flow.

<br>
<br>  
# Credits

The project was a collaborative effort across five web development engineers as a part of their coding bootcamp final Capstone project.
- Ryan Nugent
- Monica Bobadilla
- Roy Badell
- Khiry Maynard
- Jordan Munioz

