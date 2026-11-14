export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  attendance: "Present" | "Absent" | "Not Marked";
}
