"use server"
import { UploadFormSchema } from "@/utils/validation";
import supabase from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@/utils/r2'

const VERCEL_DEPLOY_HOOK = process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_HOOK;

export const uploadSyllabi = async (formData: FormData) => {
  const upload_data = {
    course_code: formData.get('course_code'),
    course_name: formData.get('course_name'),
    school: formData.get('schools_form'),
    term: formData.get('term_form'),
    year: formData.get('year_form'),
    file: formData.get('file_form')
  }

  // validate data/file state
  const result = UploadFormSchema.safeParse(upload_data);
  if (!result.success) { return { error: result.error.issues[0] }; }
  if (!upload_data.file) { return { error: "No file uploaded" }; }
  if (!(upload_data.file instanceof File)) { return { error: "File is not a file" }; }

  // generate unique filename and remove special characters from file
  let id = uuidv4().substring(0, 8);
  let file_name = `${upload_data.course_code}-${upload_data.term}-${upload_data.year}-${id}`;
  file_name = file_name.replace(/[^\w\s]/gi, '');
  if (!upload_data.course_code) { return { error: "No course code" }; }

  // R2 file upload
  uploadFile(file_name).then(res => {
    const url = res.url;
    return fetch(url, {
      method: "PUT",
      body: upload_data.file
    })
  }).then((res) => { if (!res.ok) { return { error: "File upload failed" }; } })

  const course_code = upload_data.course_code.toString().toUpperCase();
  const { data: insert_data, error: insert_error } = await supabase.from('Syllabi').insert([
    {
      course_code: course_code,
      title: upload_data.course_name,
      school: upload_data.school,
      term: upload_data.term,
      year: upload_data.year,
      link: file_name
    }
  ])

  if (insert_error) { return { error: insert_error.message }; }

  // the syllabus was inserted so redeploy site
  fetch(VERCEL_DEPLOY_HOOK as string);


  return { success: true };
};