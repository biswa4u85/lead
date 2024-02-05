"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useSession()

  useLayoutEffect(() => {
    if (data && data?.user) {
      if ((data?.user as any)?.role == "user") {
        router.push("/pro");
      }else if ((data?.user as any)?.role == "approval") {
        router.push("/approval");
      }else{
        setLoading(false)
      }
    }
  }, [data])


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {/* <!-- ===== Header Start ===== --> */}
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
}
