# 🦖 DinoGame Backend

The backend of **DinoGame**, a web platform for digital video game distribution that connects players and developers in a unified ecosystem.  
This repository contains the **NestJS-based API** responsible for authentication, game management, analytics, and administrative tools.

---

## 🚀 Overview

The backend provides a RESTful API using **NestJS**, with PostgreSQL as the primary database.  
It handles authentication (JWT), authorization (role-based guards), CRUD operations, reports, statistics, and data persistence through TypeORM.

---

## 🧩 Tech Stack

| Category         | Technologies                   |
| ---------------- | ------------------------------ |
| Framework        | NestJS                         |
| Language         | TypeScript                     |
| ORM              | TypeORM                        |
| Database         | PostgreSQL                     |
| Authentication   | JWT + Guards + Role Decorators |
| Cloud Storage    | Firebase Storage               |
| Testing          | Jest                           |
| Containerization | Docker + docker-compose        |
| Deployment       | Railway / Render               |
| CI/CD            | Lefthook + ESLint + Prettier   |

---

## 🏗️ Architecture Overview

- **Modules:** Each domain (auth, users, videogames, reports, etc.) is implemented as a separate NestJS module.
- **Controllers:** Define REST endpoints for each feature.
- **Services:** Business logic and data manipulation.
- **Entities:** Represent database tables using TypeORM decorators.
- **DTOs & Validators:** Define and validate data transfer structures.
- **Guards & Decorators:** Enforce authentication and role-based access control.

---

## ⚙️ Core Features

- 🔐 JWT-based authentication and role authorization.
- 🕹️ CRUD for video games, developers, categories, and news.
- 🧾 Dynamic reporting and sales statistics.
- 💾 Firebase integration for asset management.
- 🧮 Real-time dashboard data for administrators.
- 🧰 Soft-delete support for secure data management.
- 📈 Scalable PostgreSQL data model with clear relationships.

---

## 🧪 Testing & Quality Assurance

- **Unit Tests:** Core modules tested with Jest.
- **Integration Tests:** Ensure correct module communication.
- **Database Consistency Tests:** Validate referential integrity and constraints.
- **Code Quality Metrics:** Track defect density, MTTD, and code coverage.

---

## 🧰 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/amg1114/dino-game-backend.git
cd dino-game-backend

# Install dependencies
npm install

# Configure environment variables (.env)

# Run PostgreSQL via Docker
docker-compose up -d

# Run in development mode
npm run start:dev

# Run tests
npm run test
```

---

## 🗃️ Project Structure (simplified)

```
src/
├─ auth/
├─ users/
├─ video-games/
├─ reports/
├─ categorias/
├─ statistics/
├─ assets/
└─ config/
```

---

## 👨‍💻 Team & Credits

| Member                         | Role                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| **Johan Alejandro Moreno Gil** | 💼 Lead Full-Stack Developer, Scrum Master, System Architect |
| Andrés Felipe Cabal Correa     | Full-Stack Developer                                         |
| Daniel José Cuestas Parada     | Frontend Developer / QA                                      |
| Natalia Gómez Delacruz         | Frontend Developer                                           |
| Gina Paola Moreno Caicedo      | Frontend Developer                                           |

> **Developed at Universidad del Valle – Tuluá Campus (2025)**  
> For the _Software Product Quality_ course – supervised by _Ing. Luis Adrián Lasso C., M.Sc._

---

## 🏁 License

This project is for academic and portfolio demonstration purposes.  
All rights reserved © 2025 – DinoGame Team.
