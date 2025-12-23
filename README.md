# 📦 Full-Stack Web Application – Pinterest Clone

## 📝 Description

This project is a **Full-Stack Web Application** inspired by Pinterest, built using **Next.js** for the front end with client-side rendering, and **Context API** for authentication and user session management.

The application focuses on delivering a smooth, modern user experience with real-time UI updates and responsive design across all devices.

The app includes:
- Login and registration pages
- A dynamic Navbar that updates instantly after login (no page reload)
- Product / image search functionality
- Users list and user Dashboard
- Authentication & session management using Context API
- Cloudinary integration for avatar image uploads
- Mobile Sidebar with smooth open/close animations

---

## ⚙️ Features

- **Dynamic Navbar**  
  Automatically updates based on user authentication state without refreshing the page.

- **Responsive Design**  
  Fully responsive layout; mobile sidebar appears on screens below 820px.

- **Authentication System**  
  Context API manages user sessions, authentication state, and live UI updates.

- **Cloudinary Integration**  
  Upload, store, and display user avatar images securely.

- **Search Functionality**  
  Search for products or images directly within the application.

- **Logout System**  
  Clears authentication tokens from `localStorage` and ends the user session safely.

- **Modern Styling**  
  Built with Tailwind CSS for fast, scalable, and customizable UI development.

---

## 🧰 Technologies Used

- **Next.js 13+** (React with Server & Client Components)
- **TypeScript**
- **Tailwind CSS**
- **React Icons**
- **Next-Cloudinary**
- **Context API** (User authentication & session state)
- **LocalStorage** (Token & user data persistence)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ZenZN99/Pinterest-clone.git
cd Pinterest-clone
2️⃣ Install Dependencies
bash
Copy code
npm install
Or using Yarn:

bash
Copy code
yarn install
3️⃣ Environment Variables
Create a .env.local file in the project root and add:

env
Copy code
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
NEXT_PUBLIC_API_URL=http://localhost:3000/api
4️⃣ Run the Application
bash
Copy code
npm run dev
Open the application in your browser:

arduino
Copy code
http://localhost:3000
📂 Project Structure
bash
Copy code
/app
 ├─ /context
 │   └─ AuthContext.tsx      # Authentication and user session management
 ├─ /libs
 │   └─ actions.ts           # API calls (e.g., me())
 ├─ /models
 │   └─ User.ts              # User interface (IUser)
 ├─ /pages
 │   ├─ login.tsx
 │   ├─ register.tsx
 │   └─ index.tsx
 ├─ /components
 │   └─ Navbar.tsx
 ├─ /public
 │   └─ logo.png
 └─ /styles
     └─ globals.css
🧑‍💻 Usage
Create an account or log in.

After login, the Navbar updates dynamically with user information, Dashboard, and Users icons.

Use the search bar to find products or images.

On mobile devices, use the menu icon to open the sidebar.

Click Logout to end the session and return to the login page.

⚡ Notes
Live UI Updates
The Navbar updates instantly after login using Context API without page reloads.

Fully Responsive
Mobile Sidebar appears on screens smaller than 820px.

Cloudinary Storage
All user avatars are securely stored and served via Cloudinary.

📌 Future Improvements
Add role-based access control (Admin / Moderator / User)

Build personalized user dashboards with advanced features

Enhance search functionality and connect to a real database

Add Dark / Light mode support

📜 License
MIT License © 2025
Developed by Zen
