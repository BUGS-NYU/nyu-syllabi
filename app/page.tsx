import Link from 'next/link'
import { schools } from '../data/schools'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Header from './components/header'

export default function Home() {
  return (
    <div>
      <div>
        <Header />
        {/* <h1 id="title">NYU Syllabi</h1> */}
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
    </div>    
  )
}