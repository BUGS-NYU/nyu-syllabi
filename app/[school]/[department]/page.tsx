import Link from 'next/link';

type Params = {
    params: {
        department: string;
    }
}

export default function Department( {params}: Params ) {
    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
}