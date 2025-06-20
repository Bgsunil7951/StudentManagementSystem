﻿###StudentManagementSystem

 A full-stack Student Management System built with Spring Boot (Java) for the backend and React.js for the frontend. The application allows users to securely register, authenticate, and perform CRUD operations on student records.

##Project Structure
1->StudentManagementSystem/   --> Spring Boot backend (API + JWT + MySQL)
2->app/                       --> React frontend (UI + Routing + Tailwind + React Query)

#Tech Stack
****Backend (StudentManagementSystem)
1. Java 17
2. Spring Boot
3. Spring Security with JWT authentication
4. Spring Data JPA
5. MySQL

🔜 Frontend (app)
1. React.js (with Vite)
2. React Router
3. Tailwind CSS
4. Axios
5. Formik + Yup (form validation)


🔐 Features
✅ Authentication
1. User Signup and Login using JWT.
2. JWT stored securely in localStorage.
3. Token sent with Authorization header in all secure API calls.

👨‍🎓 Student Module
1. Create student
2. View all students
3. View individual student details
4. Update student\
5. Delete student
6. Search student by ID (client-side filter)

⚙️ Setup Instructions
1️⃣ Clone the Repository

git clone https://github.com/your-username/student-management-system.git
cd student-management-system
2️⃣ Backend Setup (StudentManagementSystem)
📁 Navigate to backend folder:
cd StudentManagementSystem
📄 Configure MySQL:
Edit src/main/resources/application.properties:


spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
▶️ Run the Spring Boot Application
./mvnw spring-boot:run
# or in Windows
mvn spring-boot:run
The backend will start at: http://localhost:8085

3️⃣ Frontend Setup (app)
📁 Navigate to frontend folder:
cd ../app

📦 Install dependencies:
npm install

▶️ Start the development server:
npm run dev
Frontend will be available at: http://localhost:5173

##Screenshorts
1. https://github.com/user-attachments/assets/29b734ba-bc95-401f-8282-95cc8068e477
2. https://github.com/user-attachments/assets/cd7e113d-38a7-4729-9ecf-9344d8b0ef7b
3. https://github.com/user-attachments/assets/48121bc3-7096-4115-9ba9-0a46ca48b691
4. https://github.com/user-attachments/assets/2e187e61-2a6e-4890-8af9-d8f5f46d69f5






🙌 Author
Sunil Biradar
bgsunil7951@gmail.com
