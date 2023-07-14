import Link from 'next/link'
import { schools } from '../data/schools'

export default function Home() {
  return (
    <div>
      <div>
        <h1 id="title">NYU Syllabi</h1>
        <h2 id="subtitle">Schools</h2>
        <ul id="links">
          {schools.map((school) => (
            <li key={school.id}>
              <Link id='links' href={`/${school.id}`}> 
                {school.name}   
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr></hr>
      <div>
        <h2>Submit your Syllabus</h2>
        <p>If you would like to submit your syllabus, you can submit them through the Google Form <a href="https://forms.gle/MKw18eFGSjkpdtKv5">here</a>.</p>

        <h2>Takedown Requests</h2>
        <p>If you would like to takedown a syllabus on this site, please send an email to nyu.syllabus@gmail.com and note the infringing material to be removed.</p>
      </div>
    </div>    
  )
}