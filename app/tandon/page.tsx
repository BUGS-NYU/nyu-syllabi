import SyllabiPage from "@/components/syllabi-page";

const SCHOOL_FULL_NAME = 'Tandon School of Engineering';

export default async function School() {
  return (
    <div>
      <SyllabiPage school_full_name={SCHOOL_FULL_NAME} />
    </div>
  );
}