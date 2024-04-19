import { notFound } from "next/navigation";

const R2_STORAGE_URL = "https://blobs.nyusyllabi.com/";

export default function Preview({ params }: { params: { blobId: string } }) {
  if (!params.blobId) {
    return notFound();
  }

  return (
    <embed
      src={`${R2_STORAGE_URL}${params.blobId}`}
      width="100vw"
      height="100vw"
    />
  );
}
