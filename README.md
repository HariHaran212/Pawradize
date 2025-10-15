# 🐾 Pawradise - Pet Hub Frontend

A modern, full-featured web application for "Pawradise," a fictional pet hub based in Coimbatore. This repository contains the complete frontend built with React, featuring a comprehensive user-facing website and a multi-level role-based admin panel.

**Live Demo:** [pawradise.vercel.app](https://pawradise.vercel.app) *(Replace with your deployed link)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-v3-blue.svg)](https://tailwindcss.com/)

---
## ## Screenshots

| Homepage | Shop Page | Admin Dashboard |
| :---: | :---: | :---: |
|  |  |  |

---
## ## Key Features

The application is split into two main parts: a rich user-facing website and a powerful admin panel with role-based access control.

### 👤 **User Features**

* **E-commerce Store**: Browse, filter, and purchase pet products with a fully functional cart and checkout flow (COD & Online Payments).
* **Pet Adoption Platform**: View detailed profiles of pets available for adoption and submit visit request applications.
* **User Authentication**: Secure local (email/password) and social (Google OAuth2) login, registration, and password management.
* **Personalized Accounts**: Users have their own profiles (editable with OTP verification), order history, adoption request tracking, and account deactivation with a 15-day grace period.
* **Content Hub**: A blog-like section with articles and guides on pet care.

### 👑 **Admin & Role-Based Features**

* **Multi-Level Roles**: Secure access control for **Super Admin**, **Store Manager**, and **Adoption Coordinator**.
* **Dedicated Dashboards**: Each staff role has a unique dashboard and navigation based on their permissions.
* **Content Management**: A rich text editor for creating and managing Pet Care Guides.
* **Store Management**: Full CRUD functionality for products and comprehensive order management.
* **Adoption Management**: Manage pet listings and approve/decline user visit requests.
* **User Management**: An interface for Super Admins to view all users and manage their roles.
* **Site Settings**: A global settings panel for admins to update store contact information and notification preferences.

---
## ## Tech Stack

* **Framework**: [React 19](https://react.dev/) (using Vite)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Routing**: [React Router DOM](https://reactrouter.com/)
* **State Management**: React Context API
* **HTTP Client**: Axios
* **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)

---

### **Prerequisites**

* Node.js (v18 or later)
* npm or yarn
* A running instance of the [Pawradise Backend API](https://github.com/HariHaran212/Pawradize-service) *(Link to your backend repo)*