"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from 'next/navigation'
import { FormData } from "./FormData";
const resource = "payments";

export default function Page() {
  const router = useRouter()

  return (
    <>
      <Breadcrumb pageName="Make Payment" />
      <div className="fixed bottom-4 right-4 z-999">
        <button onClick={() => router.push('/admin/payments')} className="px-4 py-2 font-bold text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90">
          Back
        </button>
      </div>
      <FormData resource={resource} router={router} />
    </>
  );
}