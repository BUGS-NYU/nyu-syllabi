import Link from 'next/link'
import { schools } from '../data/schools'
import Container from 'react-bootstrap/Container';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Home() {
  const logo = "/images/light/logo.svg";

  return (
    <div>
      <div>
        <div id="header">
          <h1 id="title">
            <Link href="https://bugsnyu.com"><img src={logo} id="bugslogo" alt="BUGS Logo" height="40px" width="40px" /></Link>
            NYU Syllabi
          </h1>
        </div>

        {/* Load in the schools below */}
        <div>
          <h1 id="subtitle">Schools <ArrowRightAltIcon /> </h1>
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
          
        <div>
          <h1 id="subtitle">Contribute <ArrowRightAltIcon />  </h1>
          <ul id="links">
            <Link id='links' href="https://forms.gle/ZEnhtKBxA8rXhhyN9">Upload a Syllabi</Link>
          </ul>
        </div>

        <div>
          <h1 id="subtitle">Contact <ArrowRightAltIcon /> </h1>
          <ul id="links">
            <Link id='links' href="mailto:bugsnyu@gmail.com">bugsnyu@gmail.com</Link>
          </ul>
        </div>

      </div>
    </div>    
  )
}