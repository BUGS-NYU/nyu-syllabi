import { MotionDiv } from '../../utils/use-client';
import Link from 'next/link';
import { schools } from '../../data/schools';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Form from '../../components/form';
import supabase from '@/utils/supabase';

type Props = {
    schools: any,
    uploadSyllabi: any
}

// function ValidateForm(course_code:string, course_name:string, schools_form:string, term:string, year:string, file:File) {
// 	const course_code_validation = '^[A-Z]+-[A-Z]+-[A-Z0-9]+$'
// 	const school_validation = "^(" + schools.map((school:any) => school.name).join("|") + ")$"
// 	const term_validation = "^(" + ["Fall", "Spring", "Summer", "Winter"].join("|") + ")$"

// 	if (!course_code.match(course_code_validation) 
// 	|| !schools_form.match(school_validation) 
// 	|| !term.match(term_validation) 
// 	|| (1990 < parseInt(year) && parseInt(year) < 2030)
// 	|| (!file.name.endsWith('.pdf')) 
// 	|| (file.size > 10000000)) {
// 		return false;
// 	}
// 	return true;
// }

export default function Upload() {
	const uploadSyllabi = async (formData: FormData) => {
		//verify no null for all fields
		if (!formData.get('course_code') || !formData.get('course_name') || !formData.get('schools_form') || !formData.get('term_form') || !formData.get('year_form') || !formData.get('file_form')) {
			// alert("Please fill out all fields");
			return false;
		}

		const course_code = formData.get('course_code') as string;
		const course_name = formData.get('course_name') as string;
		const schools_form = formData.get('schools_form') as string;
		const term_form = formData.get('term_form') as string;
		const year_form = formData.get('year_form') as string
		const file_form = formData.get('file_form') as File;

		// try () {
		// 	ValidateForm(course_code, course_name, schools_form, term_form, year_form, file_form) == false
		// 	console.log(course_code, course_name, schools_form, term_form, year_form, file_form);
		// } catch (e) {

		// }

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
			</div>
			<Form schools={schools} uploadSyllabi={uploadSyllabi} />
		</MotionDiv>
	)
}