import Link from 'next/link';
import { departments } from '../../data/departments';

type Params = {
    params: {
        school: string;
    }
}

export default function School( {params}: Params ) {
    const school_departments = departments.filter(department => department.school === params.school);
    console.log(school_departments);
    return (
        <div>
            <h1>{params.school}</h1>
            <ul>
                {school_departments.map((department) => (
                    <li key={department.code}>
                        <Link href={`/${params.school}/${department.code}`}>
                            {department.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}