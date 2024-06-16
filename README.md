# "Node.js Express API for Managing Students, Courses, and Modules with PostgreSQL"

This repository contains a Node.js application using Express and PostgreSQL to manage students, courses, and their related data, including scores and modules. It provides a set of API endpoints to perform CRUD operations and various other functionalities.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- PostgreSQL
- npm (Node Package Manager)

## API Endpoints

### Get All Students

- **URL:** `/students`
- **Method:** `GET`
- **Description:** Retrieves all students from the database.
- **Response:** JSON array of student objects.

### Insert Student

- **URL:** `/students`
- **Method:** `POST`
- **Description:** Inserts a new student into the database.
- **Request Body:** JSON object representing the new student.
- **Response:** JSON object confirming the insertion status.

### Update Student

- **URL:** `/students`
- **Method:** `PUT`
- **Description:** Updates a student's last name in the database.
- **Request Body:** JSON object containing updated student details.
- **Response:** JSON object confirming the update status.

### Delete Student

- **URL:** `/students/:id`
- **Method:** `DELETE`
- **Description:** Deletes a student from the database by ID.
- **Path Parameter:**
  - `id`: ID of the student to delete.
- **Response:** JSON object confirming the deletion status.

### Get All Courses

- **URL:** `/courses`
- **Method:** `GET`
- **Description:** Retrieves all courses from the database.
- **Response:** JSON array of course objects.

### Insert Course

- **URL:** `/courses`
- **Method:** `POST`
- **Description:** Inserts a new course into the database.
- **Request Body:** JSON object representing the new course.
- **Response:** JSON object confirming the insertion status.

### Update Course

- **URL:** `/courses/:id`
- **Method:** `PUT`
- **Description:** Updates a course in the database by ID.
- **Path Parameter:**
  - `id`: ID of the course to update.
- **Request Body:** JSON object containing updated course details.
- **Response:** JSON object confirming the update status.

### Delete Course

- **URL:** `/courses/:id`
- **Method:** `DELETE`
- **Description:** Deletes a course from the database by ID.
- **Path Parameter:**
  - `id`: ID of the course to delete.
- **Response:** JSON object confirming the deletion status.

### Get Students and Courses

- **URL:** `/studentcourse`
- **Method:** `GET`
- **Description:** Retrieves data joining students and courses.
- **Response:** JSON array of student-course pairs.

### Get All Modules

- **URL:** `/modules`
- **Method:** `GET`
- **Description:** Retrieves all modules from the database.
- **Response:** JSON array of module objects.

### Insert Module

- **URL:** `/modules`
- **Method:** `POST`
- **Description:** Inserts a new module into the database.
- **Request Body:** JSON object representing the new module.
- **Response:** JSON object confirming the insertion status.

### Update Module

- **URL:** `/modules/:id`
- **Method:** `PUT`
- **Description:** Updates a module in the database by ID.
- **Path Parameter:**
  - `id`: ID of the module to update.
- **Request Body:** JSON object containing updated module details.
- **Response:** JSON object confirming the update status.

### Delete Module

- **URL:** `/modules/:id`
- **Method:** `DELETE`
- **Description:** Deletes a module from the database by ID.
- **Path Parameter:**
  - `id`: ID of the module to delete.
- **Response:** JSON object confirming the deletion status.

### Calculate Student Score

- **URL:** `/studentscore`
- **Method:** `GET`
- **Description:** Calculates and returns total scores for all students across all modules.
- **Response:** JSON array of student scores.

### Reset Password

- **URL:** `/reset-password`
- **Method:** `POST`
- **Description:** Resets a student's password in the database.
- **Request Body:** JSON object containing student ID and new password.
- **Response:** JSON object confirming the password reset status.

### Update Student Score

- **URL:** `/update-score`
- **Method:** `POST`
- **Description:** Updates a student's score for a specific module in the database.
- **Request Body:** JSON object containing student ID, module ID, and new score.
- **Response:** JSON object confirming the score update status.

### Get Total Score by Student ID

- **URL:** `/students/total-score/:id`
- **Method:** `GET`
- **Description:** Calculates and returns the total score for all modules of a specific student.
- **Path Parameter:**
  - `id`: ID of the student.
- **Response:** JSON object with the total score.

### Get Module Scores by Student ID

- **URL:** `/students/module/:id`
- **Method:** `GET`
- **Description:** Retrieves module scores for a specific student from the database.
- **Path Parameter:**
  - `id`: ID of the student.
- **Response:** JSON array of module scores.

---

This documentation provides an overview of the available API endpoints for managing students, courses, modules, and related functionalities using Node.js, Express, and PostgreSQL. Adjust the descriptions and examples as per your specific API implementation.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KislayKashyap-hub/Node.js-Express-PostgreSQL-APIs.git

## Usage

1. Clone the repository: `git clone https://github.com/your-username/your-repository.git`
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database and configure `.env` file with database credentials.
4. Run the application: `npm start`
5. Use the provided API endpoints to manage students, courses, modules, and scores.
6. Restore .tar backup file to get all database.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

