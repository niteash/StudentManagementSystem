import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import {
  generateId,
  loadStudents,
  saveStudents,
} from "./lib/storage";
import type { Student, StudentInput } from "./types";
import "./styles.css";

export default function App() {
  const [students, setStudents] =
    useState<Student[]>(loadStudents);

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  function updateStudents(updated: Student[]) {
    setStudents(updated);
    saveStudents(updated);
  }

  function addStudent(input: StudentInput) {
    const newStudent: Student = {
      ...input,
      id: generateId(students),
      attendance: "Not marked",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    updateStudents([newStudent, ...students]);
    setShowForm(false);
    setMessage("Student registered successfully!");
  }

  function deleteStudent(id: string) {
    const target = students.find((s) => s.id === id);

    if (!target) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${target.name}?`
    );

    if (!confirmed) return;

    updateStudents(students.filter((s) => s.id !== id));
    setMessage("Student deleted successfully!");
  }

  const totalStudents = students.length;
  const totalCourses = new Set(
    students.map((s) => s.course.toLowerCase())
  ).size;
  const finalYear = students.filter(
    (s) => s.year === 4
  ).length;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">🎓 CampusFlow</div>
        <p className="sidebar-caption">ACADEMIC PORTAL</p>

        <nav>
          <div className="nav-link active">
            Students
          </div>
        </nav>

        <div className="sidebar-footer">
          Advanced Tools & Applications
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>CampusFlow / Students</span>
          <span className="user-label">Member 1</span>
        </header>

        <div className="content">
          <div className="page-title">
            <div>
              <p className="eyebrow">STUDENT ADMINISTRATION</p>
              <h1>Student Management</h1>
              <p className="subtitle">
                Manage student information in one place.
              </p>
            </div>

            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Add Student
            </button>
          </div>

          {message && (
            <div className="notification" role="status">
              {message}
              <button
                onClick={() => setMessage("")}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <span>👥</span>
              <p>Total Students</p>
              <h2>{totalStudents}</h2>
            </div>

            <div className="stat-card">
              <span>📚</span>
              <p>Total Courses</p>
              <h2>{totalCourses}</h2>
            </div>

            <div className="stat-card">
              <span>🎓</span>
              <p>Final Year Students</p>
              <h2>{finalYear}</h2>
            </div>
          </div>

          <StudentTable
            students={students}
            onDelete={deleteStudent}
          />
        </div>
      </main>

      {showForm && (
        <StudentForm
          existingEmails={students.map((s) => s.email)}
          onAdd={addStudent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
