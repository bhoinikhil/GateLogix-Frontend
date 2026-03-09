# GateLogix- Society Vehicle Management System Frontend

## Overview
GateLogix is a full-stack web application designed to streamline vehicle and visitor management for residential societies. It provides distinct portals for **Admins** (managing residents and their vehicles) and **Guards** (managing visitor entries and exits), ensuring security and efficient record-keeping.

This project is built using modern web technologies with a focus on role-based access control and a clean, user-friendly interface.

## Tech Stack

### Backend
*   **Java (JDK 17+):** Core programming language.
*   **Spring Boot:** Framework for building the REST API.
*   **Spring Data JPA:** For data access and repository abstraction.
*   **Hibernate:** ORM tool for mapping Java objects to database tables.
*   **MySQL:** Relational database for persistent storage.
*   **Maven:** Dependency management and build tool.

### Frontend
*   **ReactJS:** Frontend library for building the user interface.
*   **HTML, CSS, Bootstrap:** For structuring, styling, and responsive design.
*   **React Router DOM:** For handling navigation and routing between different views.
*   **Context API:** For state management across the application (e.g., user authentication state).
*   **Formik & Yup:** For building robust forms and implementing schema-based validation.
*   **Axios:** For making HTTP requests to the backend API.

## Features & Modules (Based on UI Design)

The application is divided into two main roles: **Admin** and **Guard**.

### Admin Panel
The admin is responsible for managing the society's residents and their associated vehicles.

#### 1. Resident Management (All Residents View)
*   **Description:** This page displays a comprehensive list of all residents in the society.
*   **Key Information:**
    *   Resident details: Name, Flat Number, Mobile Number, Email, and Type (Owner/Tenant).
    *   **Nested Vehicle Information:** For each resident, all registered vehicles are listed with their Type (e.g., BIKE), Model, Registration Number, and Color. This demonstrates a one-to-many relationship between a resident and their vehicles.
    *   Residents with no vehicles are also listed with a placeholder (`-`).

<img width="1920" height="1080" alt="AdminAllResident" src="https://github.com/user-attachments/assets/0b873518-07aa-45c1-9f01-62205d63f506" />


#### 2. Add New Resident & Vehicle
*   **Description:** This feature is split into two sections for adding new residents and their vehicles.
*   **"Add New Resident" Form:**
    *   Input fields for First Name, Last Name, Flat Number, Mobile Number, Email, and Resident Type (dropdown).
    *   Utilizes validation (as indicated by "Please enter mobile number" messages) to ensure data integrity, likely implemented with Formik and Yup.
*   **"Add Resident Vehicle" Form:**
    *   This form is likely used to add vehicles to an *existing* resident, identified by their `Resident Email`.
    *   Fields include Vehicle Model, Registration Number (with format hint), Type of Vehicle (dropdown), and Vehicle Color.
    *   This ensures all vehicle data is structured and validated before being sent to the backend.

<img width="1920" height="1080" alt="adminResidentEntry" src="https://github.com/user-attachments/assets/c7e92afb-c6b1-45c4-8e3e-f54263ce8527" />


### Guard Panel
The guard is responsible for managing all visitor traffic at the gate.

#### 1. Dashboard & Active Visitors
*   **Description:** This page shows a real-time list of all visitors currently on the premises (who have checked in but not checked out).
*   **Key Information:**
    *   Visitor details: Name, Entry Date, Check-In Time, Mobile Number, Vehicle Model, Vehicle Number, Purpose of Visit, and Type of Visitor (e.g., GUEST, DELIVERY).
    *   **Action:** A "Check-Out" button for each visitor. Clicking this would update the visitor's record, marking their exit time and removing them from this active list.

<img width="1920" height="1080" alt="guardDashboard" src="https://github.com/user-attachments/assets/3856d582-dbb0-45a4-8e9f-a5c4b039a4f3" />


#### 2. New Visitor Entry
*   **Description:** A dedicated page/form for registering a new visitor at the gate.
*   **Form Fields:**
    *   Visitor Name, Vehicle Number, Vehicle Name, Phone Number.
    *   **Resident Email:** A crucial field to link the visitor to the specific resident they are visiting.
    *   Visit Purpose and Type of Visitor (dropdown).
    *   A **"Check-In"** button to submit the entry, which then adds the visitor to the "Active Visitors" list.

<img width="1920" height="1080" alt="guardVisitorEntry" src="https://github.com/user-attachments/assets/fe960baa-af08-4c46-b037-cd4952fac613" />


#### 3. Guard Dashboard (Alternate View)
*   **Description:** This screen appears to be a variation of the guard's landing page or a compact widget view.
*   **Features:**
    *   A quick **"New Visitor Entry"** form for fast check-ins.
    *   A **"Phone Number"** field, possibly to look up past visitor history.
    *   A **"Resident Email"** field for quick lookup.
    *   A **"Visit Purpose"** and visitor type dropdown.
    *   **Dropdown Menus/Sections:** Provide quick access to "Active Visitors," "Visitors Checked-Out," and perhaps search functionality ("Find Visitor," "Find Resident"). This allows the guard to navigate the system efficiently.

<img width="1920" height="1080" alt="guardAllActiveVisitors" src="https://github.com/user-attachments/assets/91ae6c9b-8a96-4cdd-a3a8-f2fed7600835" />



### Authentication & Access
The system requires users to log in to access the appropriate panel.
Implemented Jwt Token based authentication and Role based authorization.

#### 1. Login Page
*   A simple and clean login form with tabs for "Login" and "SignUp".
*   Fields for Username and Password.
*   Includes a "Forgot Password?" link and an option for new users to navigate to the Sign-Up page.
*   Context API is used on the frontend to manage the authentication state and protect routes based on user roles (Admin/Guard).

<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/0fdbcfa1-e669-4916-9bcc-3a7039d9e1bb" />



#### 2. Sign-Up Page
*   A registration form for new users to create an account.
*   Fields: Full Name, Username/Email, Password, Mobile Number.
*   A **"Select role"** dropdown is critical, allowing a new user to specify whether they are registering as an Admin or a Guard. This role will determine their permissions and the dashboard they see after login.

<img width="1920" height="1080" alt="signup" src="https://github.com/user-attachments/assets/4aa0620a-90bc-4930-aa92-cdd81f1514a4" />



