"use server"
import supabase from '@/utils/supabase'

async function fetchSyllabi(search: string, school_full_name: string) {
  let syllabi;

  if (search) {
    const { data, error } = await supabase.from('Syllabi')
      .select('*')
      .eq('school', school_full_name)
      .order('course_code', { ascending: true })
      .textSearch('title', search, { 
        type: 'websearch',
        config: 'english'
      });

    if (error) {
      console.log(error);
      // return { error: 'Failure to fetch syllabi data' };
      return null;
    }

    syllabi = data;
  } else {
    const { data, error } = await supabase.from('Syllabi')
      .select('*')
      .eq('school', school_full_name)
      .order('course_code', { ascending: true });

    if (error) {
      console.log(error);
      // return { error: 'Failure to fetch syllabi data' };
      return null;
    }

    syllabi = data;
  }

  return syllabi;
}

// module.exports = fetchSyllabi;
export default fetchSyllabi;
