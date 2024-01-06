import { schools } from '../data/schools';

type Props = {
    schools: any,
    uploadSyllabi: any
}

{/* course-code (check regex check, copy from google sheets), title, school (drop-down), term (drop-down), year, upload doc (cap to 10 mb) */}
const Form = ({ schools, uploadSyllabi } : Props) => {
    // const course_code_validation = '^[A-Z]+-[A-Z]+-[A-Z0-9]+$'
    const course_code_validation = '^[A-Za-z]+-[A-Za-z]+-[A-Za-z0-9]+$'
    const school_validation = "^(" + schools.map((school:any) => school.name).join("|") + ")$"
    const term_validation = "^(" + ["Fall", "Spring", "Summer", "Winter"].join("|") + ")$"

    return (
        <form id='syllabiform' action={uploadSyllabi}>
            <ul>
                <li> 
                    <input 
                        type="text" 
                        id="course_code" 
                        name="course_code" 
                        pattern={course_code_validation} 
                        placeholder='Course Code (ex. ECON-UA-1)' 
                        title="SUBJECT-LEVEL-COURSEVAL (ex. ECON-UA-1)"
                    required /> 
                </li>
                <li> <input type="text" id="course_name" name="course_name" placeholder='Course Title (ex. Intro to Macroeconomics)' required /> </li>

                <li>
                    <input 
                        type="text" 
                        id="schools_form" 
                        name='schools_form'
                        list="schools_form_listings" 
                        placeholder='School (ex. College of Arts and Science)' 
                        pattern={school_validation}
                        title="Select a school from the dropdown"
                    required />
                    <datalist id="schools_form_listings">
                        <option value="">Please Select a School</option>
                        {schools.map((school:any) => (
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
                        pattern={term_validation}
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

                <li> <input type="number" id="year_form" name="year_form" placeholder='Year (ex. 2022)' min={1990} max={2030} required /> </li>
                <li id='filesubmit'> 
                    <input type="file" id="file_form" name="file_form" accept=".pdf, .doc, .docx" /> 
                    <input type="submit" value="Submit" /> 
                </li>
            </ul>
        </form>

    )
}

export default Form;