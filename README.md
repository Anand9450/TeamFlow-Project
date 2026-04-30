# TeamFlow - Team Task Manager 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-blue?style=for-the-badge)](#) <!-- Add your deployment link here -->

TeamFlow is a scalable, full-stack Team Task Management application designed to streamline project tracking, task assignment, and collaboration. It features secure Role-Based Access Control (RBAC), an intuitive dashboard, and efficient API performance.

## 🌟 Features

- **Secure Authentication:** JWT-based authentication.
- **Role-Based Access Control (RBAC):** Distinct permissions for `Admin` and `Member` roles.
- **Project Management:** Create, manage, and assign team members to specific projects.
- **Task Tracking:** Assign tasks with priority levels, deadlines, and dynamic status updates (To Do, In Progress, Review, Done).
- **Dynamic Dashboard:** Real-time analytics displaying total, completed, pending, and overdue tasks.
- **Responsive UI:** A modern, premium interface built for maximum user engagement.

## 💻 Tech Stack

**Frontend:**
- React.js (Vite)
- Axios (API Client)
- Vanilla CSS / Tailwind (Modern Styling)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs

## 📸 Screenshots

> *Add screenshots of your application here after deployment.*

| Dashboard View | Task Board |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/600x400?text=Dashboard+Screenshot) | ![Task Board Placeholder](https://via.placeholder.com/600x400?text=Task+Board+Screenshot) |

## 🚀 Installation & Local Setup

Follow these steps to run the application locally on your machine.

### Prerequisites
- Node.js (v16+)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Anand9450/TeamFlow-Project.git
cd TeamFlow-Project
```

### 2. Install Dependencies
Run this in your project root directory:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in your root backend directory and add the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 4. Run the Application
Start the development server:
```bash
npm run dev
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate & receive JWT
- `GET /api/auth/me` - Get current logged-in user profile

### Projects
- `POST /api/projects` - Create a new project *(Admin)*
- `GET /api/projects` - Get all projects for the logged-in user
- `PUT /api/projects/:id` - Update project details *(Admin)*
- `DELETE /api/projects/:id` - Delete project *(Admin)*

### Tasks
- `POST /api/projects/:projectId/tasks` - Create a task
- `GET /api/projects/:projectId/tasks` - List tasks
- `PUT /api/tasks/:id` - Update task status/assignee
- `DELETE /api/tasks/:id` - Delete a task *(Admin)*

### Dashboard
- `GET /api/dashboard/stats` - Fetch task statistics (Total, Completed, Pending, Overdue)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Anand9450/TeamFlow-Project/issues).

## 📄 License
This project is licensed under the MIT License.
