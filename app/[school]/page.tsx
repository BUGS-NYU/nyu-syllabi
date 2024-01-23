import Link from 'next/link';
import { schools } from '@/data/schools';
import supabase from '../../utils/supabase'
import { MotionDiv } from '../../utils/use-client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SyllabiTable from '../../components/syllabi-table';
import Search from '../../components/search';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

export const revalidate = 60;

export default async function School({ params, searchParams } : { params: { school: string }, searchParams: { search: string }}) {
  const supabase_storage_url = 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/'

  //map back from school_id to school name
  const school_id = params.school;  
  const school_full_name = schools.filter(school => school.id === school_id)[0].name

  // read search query from URL, if it exists
  const search = searchParams.search ? searchParams.search : ''  

  const { data: syllabi, error } = await supabase.from('Syllabi').select('*').eq('school', school_full_name).order('course_code', { ascending: true })

  if (error) {
    console.log(error);
    return <div>Error: Failure to fetch syllabi data </div>
  }

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div> 
          <Link id="backlink" href="/"> <h1><KeyboardBackspaceIcon />  Previous Page </h1> </Link> 
          <h1 id="subtitle">{school_full_name}</h1>
        </div>

        <div id='search_container'>
          <Search />
        </div>

        <div id='tabledisplay'>
          <SyllabiTable syllabi={syllabi} />
        </div>
      </div>
    </MotionDiv>    
  );
}