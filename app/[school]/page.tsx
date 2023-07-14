import Link from 'next/link';
import { getGoogleSheetSyllabi } from '@/data/sheet';
import { GetServerSideProps } from 'next';

export default async function School() {
  const schools = [
    {
        id: 'stern',
        name: 'stern'
    },
  ]
//   console.log("Test")

  const data = await getData()
  console.log(data); 

  return (
    <div>
      <div>
        <h1 id="title">NYU Syllabi</h1>
        <h2 id="subtitle">Syllabi</h2>
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
  );
}

// export async function getServerSideProps() {
//     const sheets = await getGoogleSheetSyllabi();
//     console.log(sheets)
//     console.log("Teslktrjsel;kfjdsl;kjflk;")
//     return {
//         props: {
//             sheets
//         },
//         revalidate: 10,
//     };
// }

async function getData() {
    const res = await getGoogleSheetSyllabi()

    if (!res) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res
}