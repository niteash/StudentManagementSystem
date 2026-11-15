
import { useState, type FormEvent } from "react";
import type { Student, StudentInput } from "../types";

interface Props {
  student: Student;
  existingEmails: string[];
  onSave: (student: StudentInput) => void;
  onClose: () => void;
}

export default function EditStudentModal({
  student,
  existingEmails,
  onSave,
  onClose,
}: Props) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [course, setCourse] = useState(student.course);
  const [year, setYear] = useState(student.year);
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

    if (!Number.isInteger(year) || year < 1 || year > 4) {
      setError("Academic year must be between 1 and 4.");
      return;
    }

    const duplicateEmail = existingEmails.some(
      (item) =>
        item.toLowerCase() === cleanEmail &&
        cleanEmail !== student.email.toLowerCase()
    );

    if (duplicateEmail) {
      setError("Another student already uses this email.");
      return;
    }

    onSave({
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
        aria-labelledby="edit-heading"
      >
        <div className="modal-header">
          <div>
            <h2 id="edit-heading">Edit Student</h2>
            <p>Update the student's information.</p>
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
          <label htmlFor="edit-name">Full Name</label>
          <input
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            required
          />

          <label htmlFor="edit-email">Email Address</label>
          <input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="edit-course">Course</label>
          <input
            id="edit-course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <label htmlFor="edit-year">Academic Year</label>
          <select
            id="edit-year"
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
            <p className="error" role="alert">
              {error}
            </p>
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
              Update Student
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
