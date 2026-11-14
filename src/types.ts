export type Attendance = 'Present' | 'Absent' | 'Not marked';
export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  attendance: Attendance;
  createdAt: string;
};
export type StudentInput = Pick<Student, 'name'|'email'|'course'|'year'>;
