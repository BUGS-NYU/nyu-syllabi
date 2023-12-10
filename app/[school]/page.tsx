import Link from 'next/link';
import { getGoogleSheetSyllabi } from '@/data/sheet';
import { schools } from '@/data/schools';
import Header from '@/app/components/header';

export default async function School({ params } : { params: { school: string }}) {
  const syllabi = await getData()
  
  //map back from school_id to school name
  const school_id = params.school;  
  const school_listing = schools.filter(school => school.id === school_id);

  if (school_listing.length === 0) {
    return <div>Hmmm... something is not right...</div>
  }

  const school_name = school_listing[0].name;

  //filter syllabi by school
  const school_syllabi = syllabi.filter(syllabus => syllabus.school === school_name);
  //sort school syllabi by course id 
  school_syllabi.sort((a, b) => (a.albert_catalog_number > b.albert_catalog_number) ? 1 : -1)

  return (
    <div>
      <div>
        <Header />
        <h2 id="subtitle">Syllabi</h2>

        <ul id="links">
          {school_syllabi.map((syllabi) => (
            <li key={syllabi.albert_catalog_number}>
                <a id="links" href={syllabi.link}> {syllabi.albert_catalog_number} ({syllabi.course_title}) </a>
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
        throw new Error('Failed to fetch data')
    }

    return res
}