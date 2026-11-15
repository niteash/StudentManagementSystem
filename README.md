# CampusFlow – Student Management System

CampusFlow is a web-based Student Management System developed as a group project for the SEC101 MCA assignment at the University of Delhi.

The application provides a simple interface to manage student records, search and filter the student directory, update student information, and manage attendance.

## Objectives

- Develop a functional web-based Student Management System.
- Implement CRUD operations for student records.
- Provide search, filtering, sorting, and pagination.
- Allow student information to be edited with validation.
- Manage student attendance and display attendance statistics.
- Practice collaborative development using Git, GitHub, and Markdown.

## Features

| Feature | Description |
|---|---|
| Student Registration | Add new student records with input validation. |
| Student Directory | Display registered students. |
| Student Deletion | Remove student records. |
| Student Editing | Update student details through an edit modal. |
| Search | Search students by name, email, or student ID. |
| Filtering | Filter records by course and year. |
| Sorting | Sort student names alphabetically in ascending or descending order. |
| Pagination | Navigate through student records and select page sizes. |
| Attendance Management | Mark students as Present, Absent, or Not marked. |
| Attendance Statistics | Display attendance-related statistics. |

## Technologies Used

- React
- TypeScript
- Vite
- CSS
- Browser Local Storage
- Git and GitHub

## Project Structure

```text
StudentManagementSystem/
├── docs/
├── src/
│   ├── components/
│   │   ├── EditStudentModal.tsx
│   │   ├── StudentForm.tsx
│   │   └── StudentTable.tsx
│   ├── lib/
│   │   └── storage.ts
│   ├── types.ts
│   ├── App.tsx
│   └── styles.css
├── .gitignore
├── CONTRIBUTING.md
├── README.md
├── package.json
└── vite.config.ts
```

*The structure above highlights the main application files; additional configuration files may also be present.*

## Installation and Execution

### Prerequisites

- Node.js
- npm
- Git

### Steps

1. Clone the repository:

```bash
git clone https://github.com/niteash/StudentManagementSystem.git
```

2. Open the project directory:

```bash
cd StudentManagementSystem
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Data Storage

Student records are stored using browser Local Storage. This allows changes to remain available after refreshing the application in the same browser.

The application uses sample student records for demonstration. Do not enter real or confidential student information.

## Team Members and Contributions

| Member | GitHub | Branch | Contributions |
|---|---|---|---|
| Student 1 | niteash | `feature-member1` | Student registration, directory, deletion, and other assigned features. |
| Student 2 | abhinsane | `feature-member2` | Student editing, search, filtering, sorting, pagination, attendance management, and attendance statistics. |



## GitHub Repository

[CampusFlow – Student Management System](https://github.com/niteash/StudentManagementSystem)

## Academic Project

Developed as part of the SEC101 MCA Group Assignment.

**Institution:** University of Delhi

