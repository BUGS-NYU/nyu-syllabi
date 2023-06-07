import Link from 'next/link'
import { schools } from '../data/schools'

export default function Home() {
  return (
    <div>
      <h1>NYU Syllabi</h1>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            {/* <Link href={`/school/${encodeURIComponent(school.id)}`}> */}
            {/* <Link href={`/school`}> */}
            <Link href={`/${school.id}`}> 
              {school.name}   
            </Link>
          </li>
        ))}
      </ul>
    </div>    
  )
}