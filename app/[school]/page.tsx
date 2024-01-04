import Link from 'next/link';
import { schools } from '@/data/schools';
import supabase from '../../utils/supabase'
import { MotionDiv } from '../../utils/use-client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const revalidate = 60

export default async function School({ params } : { params: { school: string }}) {

  //map back from school_id to school name
  const school_id = params.school;  
  const school_full_name = schools.filter(school => school.id === school_id)[0].name

  const { data: syllabi, error } = await supabase.from('Syllabi').select('*').eq('school', school_full_name).order('course_code', { ascending: true })

  if (error) {
    console.log(error);
    return <div>Error: Failure to fetch syllabi data </div>
  }
  
  console.log(syllabi)

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div id="subtitle">
          {/* <h1><Link href="/"><KeyboardBackspaceIcon />Previous Page</Link> </h1> */}
          <h1>{school_full_name}</h1>
        </div>

        <ul id="links">
          {syllabi.map((syllabus) => (
            <li key={syllabus.course_code}>
                <Link id='links' href={syllabus.link}> 
                  {syllabus.course_code} ({syllabus.title}) 
                </Link>
            </li>
          ))}
        </ul>
      </div>
    </MotionDiv>    
  );
}