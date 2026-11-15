
import { useEffect, useMemo, useState } from "react";
import type { Attendance, Student } from "../types";

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
  onAttendanceChange: (
    id: string,
    attendance: Attendance
  ) => void;
}

export default function StudentTable({
  students,
  onDelete,
  onEdit,
  onAttendanceChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Generate a unique, normalized list of courses.
  const courses = useMemo(
    () =>
      [
        ...new Set(
          students
            .map((student) => student.course.trim().toUpperCase())
            .filter(Boolean)
        ),
      ].sort(),
    [students]
  );

  // Search, filter and sort student records.
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students
      .filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.id.toLowerCase().includes(query);

        const matchesCourse =
          courseFilter === "All" ||
          student.course.trim().toUpperCase() === courseFilter;

        const matchesYear =
          yearFilter === "All" ||
          student.year === Number(yearFilter);

        return matchesSearch && matchesCourse && matchesYear;
      })
      .sort((a, b) => {
        const comparison = a.name.localeCompare(
          b.name,
          undefined,
          { sensitivity: "base" }
        );

        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [
    students,
    search,
    courseFilter,
    yearFilter,
    sortOrder,
  ]);

  // Calculate pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / pageSize)
  );

  // Keep the current page within the available range.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + pageSize
  );

  // Reset pagination whenever a search or filter changes.
  function resetPage(action: () => void) {
    action();
    setCurrentPage(1);
  }

  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <h2>All Students</h2>
          <p>Manage your registered student records.</p>
        </div>

        <span className="count">
          {filteredStudents.length} of {students.length} Students
        </span>
      </div>

      {/* Search, filters and sorting */}
      <div className="student-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search name, email or student ID..."
          value={search}
          onChange={(e) =>
            resetPage(() => setSearch(e.target.value))
          }
          aria-label="Search students"
        />

        <select
          className="filter-select"
          value={courseFilter}
          onChange={(e) =>
            resetPage(() => setCourseFilter(e.target.value))
          }
          aria-label="Filter by course"
        >
          <option value="All">All Courses</option>

          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={yearFilter}
          onChange={(e) =>
            resetPage(() => setYearFilter(e.target.value))
          }
          aria-label="Filter by academic year"
        >
          <option value="All">All Years</option>

          {[1, 2, 3, 4].map((year) => (
            <option key={year} value={String(year)}>
              Year {year}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={sortOrder}
          onChange={(e) =>
            resetPage(() =>
              setSortOrder(e.target.value as "asc" | "desc")
            )
          }
          aria-label="Sort students by name"
        >
          <option value="asc">Name: A–Z</option>
          <option value="desc">Name: Z–A</option>
        </select>
      </div>

      {/* Student records */}
      {paginatedStudents.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Try changing your search or filters.</p>
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
              {paginatedStudents.map((student) => {
                const initials =
                  student.name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase() || "?";

                return (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <div className="avatar">
                          {initials}
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
                      <select
                        className={`attendance-select attendance-${student.attendance
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        value={student.attendance}
                        onChange={(e) =>
                          onAttendanceChange(
                            student.id,
                            e.target.value as Attendance
                          )
                        }
                        aria-label={`Update attendance for ${student.name}`}
                      >
                        <option value="Not marked">
                          Not marked
                        </option>
                        <option value="Present">
                          Present
                        </option>
                        <option value="Absent">
                          Absent
                        </option>
                      </select>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing{" "}
          {filteredStudents.length === 0 ? 0 : startIndex + 1}
          {" "}to{" "}
          {Math.min(
            startIndex + pageSize,
            filteredStudents.length
          )}
          {" "}of {filteredStudents.length} students
        </div>

        <div className="pagination-controls">
          <label htmlFor="page-size">Rows:</label>

          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <button
            type="button"
            className="page-btn"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(safePage - 1)}
          >
            Previous
          </button>

          <span className="page-number">
            {safePage} / {totalPages}
          </span>

          <button
            type="button"
            className="page-btn"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(safePage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
