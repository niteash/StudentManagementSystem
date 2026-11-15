
import type { Student } from "../types";

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

export default function StudentTable({
  students,
  onDelete,
  onEdit,
}: Props) {
  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <h2>All Students</h2>
          <p>Manage your registered student records.</p>
        </div>

        <span className="count">
          {students.length} Students
        </span>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Register a new student to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Course</th>
                <th>Year</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-info">
                      <div className="avatar">
                        {student.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{student.name}</strong>
                        <small>{student.email}</small>
                      </div>
                    </div>
                  </td>

                  <td>{student.id}</td>
                  <td>{student.course}</td>
                  <td>Year {student.year}</td>

                  <td>
                    <span className="status">
                      {student.attendance}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => onEdit(student)}
                        aria-label={`Edit ${student.name}`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => onDelete(student.id)}
                        aria-label={`Delete ${student.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
