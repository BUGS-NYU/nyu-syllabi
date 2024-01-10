"use server"
import { UploadFormSchema } from "@/utils/validation";
import supabase from '@/utils/supabase'

export const uploadSyllabi = async (formData: FormData) => {

    const upload_data = {
      course_code: formData.get('course_code'),
      course_name: formData.get('course_name'),
      school: formData.get('schools_form'),
      term: formData.get('term_form'),
      year: formData.get('year_form'),
      file: formData.get('file_form')
    }


  const result = UploadFormSchema.safeParse(upload_data);
  if (!result.success) {
    console.log(result.error.issues[0])
    const error = result.error.issues[0];
    return {
      error: error
    };
  }

  // validate the file
  if (!upload_data.file) {
    return {
      error: "No file uploaded"
    }
  }

  if (!(upload_data.file instanceof File)) {
    return {
      error: "File is not a file"
    }
  }

  // upload the file into supabase storage
  const { data, error } = await supabase.storage.from('syllabi-blobs').upload(upload_data.file.name, upload_data.file)
  if (error) {
    return {
      error: error.message
    }
  }
  
  // insert the syllabus into the database
  const { data: insert_data, error: insert_error } = await supabase.from('syllabi').insert([
    {
      course_code: upload_data.course_code,
      title: upload_data.course_name,
      school: upload_data.school,
      term: upload_data.term,
      year: upload_data.year,
      link: data.fullPath
    }
  ])

  if (insert_error) {
    return {
      error: insert_error.message
    }
  }

  return {
    success: true
  }

};
