import { useState, type FormEvent } from "react";
import type { StudentInput } from "../types";

interface Props {
  existingEmails: string[];
  onAdd: (student: StudentInput) => void;
  onClose: () => void;
}

export default function StudentForm({
  existingEmails,
  onAdd,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(1);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCourse = course.trim();

    if (cleanName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!cleanCourse) {
      setError("Please enter a course.");
      return;
    }

    if (existingEmails.some(
      (item) => item.toLowerCase() === cleanEmail
    )) {
      setError("A student with this email already exists.");
      return;
    }

    onAdd({
      name: cleanName,
      email: cleanEmail,
      course: cleanCourse,
      year,
    });
  }

  return (
    <div className="modal-overlay">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-heading"
      >
        <div className="modal-header">
          <div>
            <h2 id="form-heading">Register Student</h2>
            <p>Enter the student's information below.</p>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="student-name">Full Name</label>
          <input
            id="student-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            maxLength={80}
            required
          />

          <label htmlFor="student-email">Email Address</label>
          <input
            id="student-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            required
          />

          <label htmlFor="student-course">Course</label>
          <input
            id="student-course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Computer Science"
            required
          />

          <label htmlFor="student-year">Academic Year</label>
          <select
            id="student-year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[1, 2, 3, 4].map((value) => (
              <option key={value} value={value}>
                Year {value}
              </option>
            ))}
          </select>

          {error && (
            <p className="error" role="alert">{error}</p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Student
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
