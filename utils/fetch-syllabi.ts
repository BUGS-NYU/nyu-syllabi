"use server"
import supabase from '@/utils/supabase'

// does a db fetch for syllabi and dynamically 
export async function fetchSyllabi(school_full_name: string) {
  const { data, error } = await supabase.from('Syllabi')
    .select('*')
    .eq('school', school_full_name)
    .order('course_code', { ascending: true });

  if (error) { return null; }
  return data;
}

// module.exports = fetchSyllabi;
export default fetchSyllabi;
