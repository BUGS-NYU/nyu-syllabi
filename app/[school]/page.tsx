import Link from 'next/link';
import { getGoogleSheetSyllabi } from '@/data/sheet';
import { schools } from '@/data/schools';

export default async function School({ params } : { params: { school: string }}) {
  const syllabi = await getData()
  
  //map back from school_id to school name
  const school_id = params.school;  
  const school_name = schools.filter(school => school.id === school_id)[0].name;

  //filter syllabi by school
  const school_syllabi = syllabi.filter(syllabus => syllabus.school === school_name);
  //sort school syllabi by course id 
  school_syllabi.sort((a, b) => (a.course_title > b.course_title) ? 1 : -1)
//   console.log(school_syllabi)

  return (
    <div>
      <div>
        <h1 id="title">NYU Syllabi</h1>
        <h2 id="subtitle">Syllabi</h2>

        <ul id="links">
          {school_syllabi.map((syllabi) => (
            <li key={syllabi.albert_catalog_number}>
                <a id="links" href={syllabi.link}> {syllabi.course_title} ({syllabi.albert_catalog_number}) </a>
            </li>
          ))}
        </ul>
      </div>
      <hr></hr>
    </div>    
  );
}

async function getData() {
    const res = await getGoogleSheetSyllabi()

    if (!res) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res
}