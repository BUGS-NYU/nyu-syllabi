'use client';

import { schools } from '../data/schools';
import { uploadSyllabi } from '@/actions/upload-action';
import toast from 'react-hot-toast';
import { UploadFormSchema } from '@/utils/validation';

export default function Form() {
  const clientValidate = async (formData: FormData) => {
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
      const error = result.error.issues[0];
      toast.error(error.message);
      return;
    }

    // now perform server side validation + upload the syllabi
    const response = await uploadSyllabi(formData);
    if (response?.error) {
      const error = response.error; // already get .issues[0] from server action
      toast.error(error.message);
      return;
    }

    toast.success('Syllabus uploaded successfully!');

  }

  return (
    <form id='syllabiform' action={clientValidate}>
      <ul>
        <li>
          <input
            type="text"
            id="course_code"
            name="course_code"
            placeholder='Course Code (ex. ECON-UA-1)'
            required />
        </li>
        <li> <input type="text" id="course_name" name="course_name" placeholder='Course Title (ex. Intro to Macroeconomics)' /> </li>

        <li>
          <input
            type="text"
            id="schools_form"
            name='schools_form'
            list="schools_form_listings"
            placeholder='School (ex. College of Arts and Science)'
            title="Select a school from the dropdown"
            required />
          <datalist id="schools_form_listings">
            <option value="">Please Select a School</option>
            {schools.map((school: any) => (
              <option value={school.name}>{school.name}</option>
            ))}
          </datalist>
        </li>

        <li>
          <input
            type="text"
            name='term_form'
            id="term_form"
            list="term_form_listings"
            placeholder='Term (ex. Fall)'
            title="Select a term from the dropdown"
            required />
          <datalist id="term_form_listings" >
            <option value="">Please Select a Term</option>
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
          </datalist>
        </li>

        <li> <input type="number" id="year_form" name="year_form" placeholder='Year (ex. 2022)' required /> </li>
        <li id='filesubmit'>
          <input type="file" id="file_form" name="file_form" accept=".pdf, .doc, .docx" />
          <input type="submit" value="Submit" />
        </li>
      </ul>
    </form>

  )
}