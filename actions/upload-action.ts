"use server"
import { UploadFormSchema } from "@/utils/validation";
import { SupabaseClient } from "@supabase/supabase-js";

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

  // now upload the file and insert into the db


};
