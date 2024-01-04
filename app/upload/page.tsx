import { MotionDiv } from '../../utils/use-client';
import Link from 'next/link';
import { schools } from '../../data/schools';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Upload() {
	const course_code_validation = '^[A-Z]+-[A-Z]+-[A-Z0-9]+$'

	const uploadSyllabi = async (formData: FormData) => {
		"use server";
		const course_code = formData.get("course-code");
		const title = formData.get("title");
		const school = formData.get("school");
		const term = formData.get("term");
		const year = formData.get("year");
		const link = formData.get("syllabus");
	};

	return (
		<MotionDiv
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div>
				<Link id="backlink" href="/"> <h1><KeyboardBackspaceIcon />  Previous Page </h1> </Link>
				<h1 id="subtitle">Enter Syllabus Information</h1>

				<form id='syllabiform' action={uploadSyllabi}>
					<ul>
						<li> <input type="text" id="course_code" name="Course Code" placeholder='Course Code (ex. ECON-UA-1)' required /> </li>
						<li> <input type="text" id="course_name" name="course_name" placeholder='Course Title (ex. Intro to Macroeconomics)' /> </li>

						<li>
							<input type="text" id="schools_form" list="schools_form_listings" placeholder='School (ex. College of Arts and Science)' />
							<datalist id="schools_form_listings">
								<option value="">Please Select a School</option>
								{schools.map((school) => (
									<option value={school.name}>{school.name}</option>
								))}
							</datalist>
						</li>

						<li>
							<input type="text" id="schools_form" list="term_form_listings" placeholder='Term (ex. Fall)' required />
							<datalist id="term_form_listings" >
								<option value="">Please Select a Term</option>
								<option value="Fall">Fall</option>
								<option value="Spring">Spring</option>
								<option value="Summer">Summer</option>
								<option value="Winter">Winter</option>
							</datalist>
						</li>

						<li> <input type="number" id="year_form" name="year_form" placeholder='Year (ex. 2022)' min={1990} max={2030} /> </li>

						<div id='filesubmit'>
							<li> <input type="file" id="file_form" name="file_form" accept=".pdf, .doc, .docx" /> </li>
							<li> <input type="submit" value="Submit" /> </li>
						</div>
					</ul>
				</form>
			</div>

			{/* Syllabus, course-code (check regex check, copy from google sheets), title, school (drop-down), term (drop-down), year, upload doc (cap to 10 mb) */}

		</MotionDiv>
	)
}