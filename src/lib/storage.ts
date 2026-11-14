import type { Student } from '../types';
export const STORAGE_KEY = 'campusflow_students_v1';
const sample: Student[] = [
  { id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav@example.com', course: 'Computer Science', year: 2, attendance: 'Present', createdAt: '2026-09-05' },
  { id: 'STU-1002', name: 'Meera Singh', email: 'meera@example.com', course: 'Information Technology', year: 3, attendance: 'Absent', createdAt: '2026-09-07' },
  { id: 'STU-1003', name: 'Riya Verma', email: 'riya@example.com', course: 'Business Administration', year: 1, attendance: 'Present', createdAt: '2026-09-10' },
  { id: 'STU-1004', name: 'Kabir Khan', email: 'kabir@example.com', course: 'Computer Science', year: 4, attendance: 'Not marked', createdAt: '2026-09-11' },
  { id: 'STU-1005', name: 'Ananya Patel', email: 'ananya@example.com', course: 'Information Technology', year: 2, attendance: 'Present', createdAt: '2026-09-12' },
];
export function loadStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return sample;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStudent) : sample;
  } catch { return sample; }
}
function isStudent(value: unknown): value is Student {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<Student>;
  return typeof s.id === 'string' && typeof s.name === 'string' && typeof s.email === 'string' && typeof s.course === 'string' && typeof s.year === 'number' && ['Present','Absent','Not marked'].includes(s.attendance ?? '');
}
export function saveStudents(students: Student[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}
export function generateId(students: Student[]): string {
  const maximum = students.reduce((max, student) => {
    const match = /^STU-(\d+)$/.exec(student.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 1000);
  return `STU-${maximum + 1}`;
}
