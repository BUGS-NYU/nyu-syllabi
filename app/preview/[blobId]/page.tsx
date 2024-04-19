import { notFound } from "next/navigation";

const R2_STORAGE_URL = "https://blobs.nyusyllabi.com/";

async function fetchPDF({ blobId }: { blobId: string }) {
  return await fetch(`${R2_STORAGE_URL}${blobId}`);
}

export default async function Preview({
  params,
}: {
  params: { blobId: string };
}) {
  if (!params.blobId) {
    return notFound();
  }

  const res = await fetchPDF({ blobId: params.blobId });

  if (res.status !== 200) {
    return notFound();
  }

  return (
    <embed
      style={{ height: "100vh", width: "100vw" }}
      type="application/pdf"
      src={`${R2_STORAGE_URL}${params.blobId}`}
    />
  );
}
