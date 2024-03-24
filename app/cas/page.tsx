import SyllabiPage from "@/components/syllabi-page";

const SCHOOL_FULL_NAME = 'College of Arts and Science';
import supabase from '@/utils/supabase'

// export async function generateStaticParams() {
//   const { data, error } = await supabase.from('Syllabi')
//     .select('*')

//   if (error) {
//     console.log(error);
//     return null;
//   }

//   let schools = data.map((school: any) => {
//     return school.school;
//   });
//   console.log(schools);

//   return schools;
// }

export default function School() {
  return  (
    <div>
      <SyllabiPage school_full_name={SCHOOL_FULL_NAME} />
    </div>
  );
}