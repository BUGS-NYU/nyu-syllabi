import { MotionDiv } from '../../utils/use-client';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Form from '../../components/form';

export default function Upload() {
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
			<Form />
		</MotionDiv>
	)
}