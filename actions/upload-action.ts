"use server"
import { UploadFormSchema } from "@/utils/validation";
import supabase from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid';

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

  // remove special characters and spaces from the file name
  var file_name = upload_data.file.name.replace(/[^\w\s]/gi, '')
  // var file_name = upload_data.file.name.replace(/[^\w\s]/gi, '')
  file_name = uuidv4() + '-' + file_name;


  const { data, error } = await supabase.storage.from('syllabi-blobs').upload(file_name, upload_data.file)
  if (error) {
    return {
      error: error.message
    }
  }

  console.log(data, typeof data);
  // insert the syllabus into the database
  const { data: insert_data, error: insert_error } = await supabase.from('Syllabi').insert([
    {
      course_code: upload_data.course_code,
      title: upload_data.course_name,
      school: upload_data.school,
      term: upload_data.term,
      year: upload_data.year,
      link: data.path
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
