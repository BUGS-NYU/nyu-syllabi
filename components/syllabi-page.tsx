import React from 'react';
import Link from 'next/link';
import { MotionDiv } from '../utils/use-client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SyllabiTable from './syllabi-table';
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
  if (process.env.DEV_MODE = "True") {
    return [
      {
        course_code: "course_code",
        title: "title",
        term: "Spring",
        year: "2024",
        link: "link",
        timestamp: ""
      }
    ]
  }

  const { data, error } = await supabase.from('Syllabi')
    .select('*')
    .eq('school', school_full_name)
    .order('course_code', { ascending: true });

  if (data === null) {
    console.log("Error: Failure to fetch syllabi data");
    return null;
  }

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