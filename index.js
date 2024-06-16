import express from "express";
import cors from 'cors';
import 'dotenv/config';
import bodyParser from "body-parser";
import sql from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/students', async (req, res) => {
    const stud = await getStudents();
    // const stud = await insertStudent("Bob", "Marley");
    // const stud = await updateStudent("Kislay", "Kumar");
    // const stud = await deleteStudent(13);
    await res.send({ "result": "Successfully inserted students ", "data": stud });
});

// Getting all student db : 

async function getStudents() {
    const users = await sql`select id,first_name,last_name from public.students`
    return users
}

// inserting in student table :

async function insertStudent(first_name, last_name) {
    const newStudent = await sql`insert into public.students (first_name,last_name) 
                 values
                 (${first_name}, ${last_name})
                 returning first_name,last_name`
    return newStudent;
}

// Updating in student table  :

async function updateStudent(first_name, last_name) {
    const updStudent = await sql`UPDATE public.students
	                          SET last_name=${last_name}
	                          WHERE first_name=${first_name}
                              returning first_name,last_name`
    return updStudent;
}

// Deleting the column through the id:
async function deleteStudent(id) {
    const delStudent = await sql`
        delete from public.students
        where id = ${id}
        returning id, first_name, last_name
    `;
    return delStudent;
}
//  For COURSE ------------->

app.get('/courses', async (req, res) => {
    const cour = await getCourses();
    // const cour = await insertCourse("Ai/ML", "Bootcamp");
    // const cour = await updateCourse(3, "Ai/ML", "Crash-course"); 
    // const cour = await deleteCourse(3);
    await res.send({ "result": "Successfully Courses ", "data": cour });
});
// Getting all courses db : 
async function getCourses() {
    const course = await sql`select id,name from public.courses`
    return course
}
// inserting in courses table :
async function insertCourse(name, type) {
    const newCourse = await sql`insert into public.courses (name,type) 
                 values
                 (${name}, ${type})
                 returning name,type`
    return newCourse;
}

// Function to update a course  :
async function updateCourse(id, name, type) {
    const updCourse = await sql`
        UPDATE public.courses
        SET name = ${name}, type = ${type}
        WHERE id = ${id}
        RETURNING id, name, type
    `;
    return updCourse;
}

// Deleting the column through the id:
async function deleteCourse(id) {
    const delCourse = await sql`
        delete from public.courses
        where id = ${id}
        returning id, name, type
    `;
    return delCourse;
}
// JOIN API FOR students-courses

app.get('/studentcourse', async (req, res) => {
    const studentsCourses = await getStudentsCourses();
    res.send({ "result": "Successfully fetched data", "data": studentsCourses });
});
// Function of JOIN STUDENTS + COURSE -------------->
async function getStudentsCourses() {
    const query = sql`
        SELECT s.id AS student_id, s.first_name, s.last_name, c.id AS course_id, c.name AS course_name
        FROM public.students s
        JOIN public.courses c ON s.id = s.id
        order by s."id" asc
    `;
    return query;
}

// FOR MODULES : ------------------>

app.get('/modules', async (req, res) => {
    const mod = await getModule();
    // const mod = await insertModule("SQL API", 10);
    // const mod = await updateModule(25,"SQL API", 10); 
    // const mod = await deleteModule(25);
    await res.send({ "result": "Successfully Courses ", "data": mod });
});

async function getModule() {
    const module = await sql`select id,name from public.modules`
    return module
}
// inserting in module table :
async function insertModule(name, max_score) {
    const newModule = await sql`insert into public.modules (name,max_score) 
                 values
                ( ${name},${max_score})
                 returning name, max_score`
    return newModule;
}
// Function to update a module  :
async function updateModule(id, name, max_score) {
    const updModule = await sql`
        UPDATE public.modules
        SET name = ${name},max_score = ${max_score}
        WHERE id = ${id}
        RETURNING id, name, max_score
    `;
    return updModule;
}

// Deleting the column through the id:
async function deleteModule(id) {
    const delModule = await sql`
        delete from public.modules
        where id = ${id}
        returning id, name, max_score
    `;
    return delModule;
}
// API calculating Students score :
app.get('/studentscore', async (req, res) => {
    const mod = await getStudentScore();
    await res.send({ "result": "Successfully Courses ", "data": mod });
});
// Function of calculating my score :
async function getStudentScore() {
    const query = sql`
    SELECT s."id", s."first_name",c."name" as course, Sum("max_score") as "Total Course Score", SUM(ss."my_score") AS "my total Score"
    FROM studentscore ss
    JOIN students s ON ss."student_id" = s."id"
    JOIN courses c ON ss."student_id" = c."id"
    JOIN modules m ON ss."student_id"=m."id"
    WHERE s."id" = 1
    GROUP BY s."id", s."first_name",c."name"
    ORDER BY "id" asc;
    `;
    return query;
}

// API to reset password
app.post('/reset-password', async (req, res) => {
    const { id, password } = req.body;
    try {
        const result = await resetPassword(id, password);
        if (result.count > 0) {
            res.send({ message: "Password reset successfully" });
        } else {
            res.status(404).send({ error: "Student not found" });
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send({ error: "An error occurred while resetting password" });
    }
});

// Function to reset password
async function resetPassword(id, password) {
    const resetPass = await sql`
        UPDATE public.students
        SET password = (${password})
        WHERE id = ${id}
        RETURNING id, password
    `;
    return resetPass;
}

// API to update score
app.post('/update-score', async (req, res) => {
    const { student_id, coursemodule_id, my_score } = req.body;
    try {
        const result = await updateStudentScore(student_id, coursemodule_id, my_score);
        if (result.count > 0) {
            res.send({ message: "Score updated successfully" });
        } else {
            res.status(404).send({ error: "Student or module not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "An error occurred while updating the score", details: error.message });
    }
});

// Function to update-my_score : 
async function updateStudentScore(student_id, coursemodule_id, my_score) {
    const updScore = await sql`
        UPDATE public.studentscore
        SET my_score = ${my_score}
        WHERE student_id = ${student_id} AND coursemodule_id = ${coursemodule_id}
        RETURNING student_id, coursemodule_id, my_score
    `;
    return updScore;
}

// API for calculate total score for all modules for a specific student
app.get('/students/total-score/:id', async (req, res) => {
    const student_id = req.params.id;
    const totalScore = await calculateTotalScore(student_id);
    if (totalScore.length > 0) {
        res.send({ "student_id": student_id, "total_my_score": totalScore[0].total_my_score });
    } else {
        res.status(404).send({ error: "Student not found or no scores available" });
    }
});

// Function to calculate total score for all modules for a specific student
async function calculateTotalScore(student_id) {
    const totalScore = await sql`
        SELECT SUM(ss.my_score) as total_my_score
        FROM public.studentscore ss
        WHERE ss.student_id = ${student_id}
    `;
    return totalScore;
}

// module scores for a specific student
app.get('/students/module/:id', async (req, res) => {
    const student_id = req.params.id;
    try {
        const modules = await getModuleScores(student_id);
        if (modules.length > 0) {
            res.send(modules);
        } else {
            res.status(404).send({ error: "Student or modules not found" });
        }
    } catch (error) {
        console.error('Error fetching module scores:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Function to get module scores for a student
async function getModuleScores(student_id) {
    const query = await sql`
        SELECT m.name AS module_name, m.max_score, ss.my_score
        FROM public.studentscore ss
        JOIN public.modules m ON ss.id = m.id
        WHERE ss.student_id = ${student_id}
        ORDER BY ss."student_id";
    `;
    return query;
}

app.listen(process.env.PORT, () => {
    console.log("pg-coursereg listening on ", process.env.PORT);
});
