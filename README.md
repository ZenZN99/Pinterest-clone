# 📦 Full-Stack Web Application Pinterest Clone

## 📝 Description

This is a Full-Stack Web Application built with **Next.js** for the front-end and client-side rendering, using **Context API** for user authentication and session management.

The app includes:

- Login and registration pages.
- A dynamic Navbar that updates immediately after login without page reload.
- Product/Image search functionality.
- Users list and Dashboard for registered users.
- User session management (Auth Context) with Cloudinary for avatar images.
- Mobile Sidebar with smooth open/close animations.

---

## ⚙️ Features

- **Dynamic Navbar**: Shows or hides elements based on user login state.
- **Responsive Design**: Works on all screen sizes; mobile menu appears below 820px.
- **Cloudinary Integration**: Upload and display user avatars.
- **Authentication**: Context API handles session state and live UI updates after login.
- **Tailwind CSS**: Fast, responsive, and easily customizable design.
- **Search Functionality**: Users can search for products or images directly from the app.
- **Logout**: Clears token from localStorage and ends the session.

---

## 🧰 Technologies Used

- **Next.js 13+** (React + Server & Client Components)
- **TypeScript**
- **Tailwind CSS**
- **React Icons**
- **Next-Cloudinary**
- **Context API** for user state management
- **LocalStorage** for token and user data

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ZenZN99/Pinterest-clone.git
cd Pinterest-clone
2. Install dependencies
bash
Copy code
npm install
Or with Yarn:

bash
Copy code
yarn install
3. Set up environment variables
Create a .env.local file and add:

env
Copy code
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
NEXT_PUBLIC_API_URL=http://localhost:3000/api
4. Run the application
bash
Copy code
npm run dev
Open http://localhost:3000 in your browser.

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
```
🧑‍💻 Usage
Create an account or log in.

After login, the Navbar updates dynamically with user info, Dashboard, and Users icons.

Use the search bar to find products or images.

On mobile, use the menu icon to open the Sidebar.

Click Logout to end the session and redirect to the login page.

⚡ Notes
Live User Update: The Navbar updates instantly after login using the Context API; no reload required.

Responsive: Mobile Sidebar appears on screens smaller than 820px.

Cloudinary: All user avatars are stored in Cloudinary.

📌 Future Improvements
Add user role management (Admin/Moderator/User).

Create personalized Dashboards with advanced features.

Enhance search functionality and connect to a real database.

Add Dark/Light Mode support.

📜 License
MIT License © 2025
