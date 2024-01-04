import { MotionDiv } from '../../utils/use-client';
import Link from 'next/link';
import { schools } from '../../data/schools';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Form from '../../components/form';

export default function Upload() {
	const course_code_validation = '^[A-Z]+-[A-Z]+-[A-Z0-9]+$'

	const uploadSyllabi = async (formData: FormData) => {
		"use server";
		console.log(formData);
		const course_code = formData.get("course-code");
		const title = formData.get("title");
		const school = formData.get("school");
		const term = formData.get("term");
		const year = formData.get("year");
		const link = formData.get("link");
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