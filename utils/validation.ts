// validating form inputs 

import { z } from "zod";
import { schools } from '@/data/schools';

const current_year = new Date().getFullYear();

export const UploadFormSchema = z.object({
  course_code: z.string().regex(/^[A-Za-z]+-[A-Za-z]+-[A-Za-z0-9]+$/, {
    message: "Please enter a valid course code (ex. EG-UY-1004)"
  }),
  course_name: z.string().min(1, { message: "Please enter a course name" }),
  school: z.string().regex(new RegExp("^(" + schools.map((school: any) => school.name).join("|") + ")$"), {
    message: "Please select a school from the dropdown"
  }),
  term: z.string().regex(new RegExp("^(" + ["Fall", "Spring", "Summer", "Winter"].join("|") + ")$"), {
    message: "Please select a term from the dropdown"
  }),
  year: z.coerce.number().min(2000, { message: 'Year must be after 1999'}).max(current_year, { message: 'Year must be before ' + (current_year + 1) }),
  file: z.any()
    .refine((file: File) => file?.length !== 0, "File must be uploaded")
    .refine((file: File) => file?.type === "application/pdf" || file?.type === "application/msword" || file?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "File must be a PDF or Word document")
    .refine((file: File) => file?.size < 10000000, "File must be less than 10 MB")
});
