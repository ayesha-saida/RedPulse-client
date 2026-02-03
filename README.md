# 🩸 **Red Pulse** 

A full-stack blood donation management web application that connects **donors**, **volunteers** and **admins** to efficiently manage blood donation requests, donor search, funding, and user roles.

---

## 📌 Project Overview

This platform is designed to make blood donation coordination easier and more transparent.  
Users can register as donors, request blood, search donors by location and blood group, donate funds, and manage donation requests based on their role.

The system supports **role-based dashboards**, **secure private routes** and **efficient data handling**.

---

## 👥 User Roles & Permissions

### 🔴 Donor 
The default role assigned to users after registration. Donors can create and manage their own blood donation requests, donate blood and funds, and access their personal dashboard and profile.

### 🟡 Volunteer
Volunteers can monitor all blood donation requests and update their statuses. Their permissions are limited, and they cannot manage users or modify requests beyond status updates.

### 🟢 Admin
Administrators have full control over the platform. They can manage users and donation requests, assign or change user roles, control user access, and view overall system statistics and funding information

---

## 🚀 Features

### 🔐 Authentication & Authorization
The system uses Firebase Authentication to manage user login and access control. Users are assigned roles (Donor, Volunteer, or Admin), and access to private routes is restricted based on these roles. By default, new users are assigned the Donor role.

---

### 👤 Profile Management (Private)
The profile management feature allows authenticated users to view and update their personal information. Users can edit permitted profile details, while certain information remains unchanged, and all updates are securely saved to the system.

---

### 🩸 Donation Request System
The donation request system allows users to create and manage blood donation requests. Each request follows a defined lifecycle with multiple statuses to track its progress from creation to completion or cancellation.

---
## 🧭 Dashboard Layout

### 📊 Donor Dashboard
Overview of donor activity with access to manage personal donation requests.

### 🛠️ Admin Dashboard
Full platform control with user and request management.

### 🧑‍🤝‍🧑 Volunteer Dashboard
View and update donation request statuses with limited access.

---

## 🌐 Public Pages

### 🏠 Home Page
The Home page introduces the platform and its purpose. It allows users to join as donors, search for donors, view overall impact statistics, and get in touch through a contact section.


### 🔍 Search Donors (Public)
This page allows users to find available blood donors by filtering based on blood group and location. Donor results are shown only after a search is performed.


### 📋 Blood Donation Requests (Public)
Displays a list of active (pending) blood donation requests. Users can view basic request information and proceed to see detailed information on a separate private page.


### 🔒 Donation Request Details (Private)
Shows complete information about a specific blood donation request. Eligible donors can confirm their donation, which updates the request status accordingly.


## 💰 Funding System (Private)
The funding system allows users to make fund donations using Stripe (test mode) for payment processing. Contribution details such as contributor's name, amount, and date are recorded, and the total funds are displayed on the admin dashboard for tracking purposes.

---

## ⚙️ Technologies Used

### 🧰 Frontend
- **React 19** – Used for building a dynamic and component-based user interface.

- **React Router v7** – Handles client-side routing and navigation.

- **Tailwind CSS** – Provides utility-first styling for responsive layouts.

- **Ant Design** – Used for prebuilt UI components.

- **Styled Components** – Enables component-scoped styling.

- **React Hook Form** – Manages form handling and validation.

- **TanStack React Query** – Handles data fetching, caching, and synchronization.

- **Axios** – Used for making HTTP requests.

- **SweetAlert2** – Displays alert and confirmation dialogs.

- **React Toastify** – Shows non-blocking notification messages.

- **React Icons** – Provides icon support across the application.

- **React Fast Marquee** – Used for scrolling text.

----

### 🧱 Backend 
- **Express.js** – Used to build RESTful APIs and handle server-side application logic.

- **MongoDB** – Serves as the primary database for storing users, blood donation requests, and funding data.

- **CORS** – Enables secure communication between the frontend and backend.

- **dotenv** – Manages environment variables for sensitive configuration data.

---

### 🔗 Services & Integrations
- **Firebase Authentication** – Manages user authentication and role-based access.

- **Stripe Payment Gateway (Test Mode)** – Used for handling fund donations securely during testing.

---

## 🚧 Installation / Setup

1. Clone the repo
2. Install dependencies
3. Setup `.env` for backend
4. Run frontend and backend servers
