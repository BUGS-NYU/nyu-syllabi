import React from 'react';
import Link from 'next/link';
import { MotionDiv } from '../utils/use-client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SyllabiTable from './syllabi-table';
// import Search from '../../components/search';
// import fetchSyllabi from '@/actions/fetch-syllabi';
import supabase from '@/utils/supabase'

// the fetch only happens at build time and isn't dynamically refetched
export const dynamic = 'force-static';
export const revalidate = false;

export interface SyllabiObject {
  course_code: string;
  title: string;
  term: string;
  year: string;
  link: string;
  timestamp: string;
}

async function fetchSyllabi(school_full_name: string) {
  let SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // const data = fetch(`https://umtnkgqmgdtgeladncyw.supabase.co/rest/v1/Syllabi?apikey=${SUPABASE_ANON_KEY}&select=*&school=eq.Tandon%20School%20of%20Engineering&order=course_code.asc`);
  const { data, error } = await supabase.from('Syllabi')
    .select('*')
    .eq('school', school_full_name)
    .order('course_code', { ascending: true });

  if (data === null) {
    console.log("Error: Failure to fetch syllabi data");
    return null;
  }
  // if (error) {
  //   console.log(error);
  //   return null;
  // }

  return data;
}

interface SyllabiPageProps {
  school_full_name: string;

}
export default async function SyllabiPage(params: any) {
  let syllabi = await fetchSyllabi(params.school_full_name);

  if (syllabi === null) {
    return <div>Error: Failure to fetch syllabi data </div>;
  }

  return (
    <div>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div>
          <div>
            <Link id="backlink" href="/"> <h1><KeyboardBackspaceIcon /> Previous Page </h1> </Link>
            <h1 id="subtitle">{params.school_full_name}</h1>
          </div>

          <div id='tabledisplay'>
            <SyllabiTable syllabi={syllabi} />
          </div>
        </div>
      </MotionDiv>

    </div>
  );
}