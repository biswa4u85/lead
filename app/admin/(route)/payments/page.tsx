"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Table } from "antd";
import { useFetchByLoad } from "@/contexts/useFetchByLoad";
const resource = "payments";

export default function Page() {
  const router = useRouter()
  const [query, setQuery] = useState({ "skip": 0, "take": 10 })
  const { fetch, data, loading } = useFetchByLoad({ url: resource, query: JSON.stringify(query) });

  useEffect(() => {
    fetch()
  }, [query])

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      sorter: true,
      render(val: any) {
        return (
          <span>
            {`${val?.firstName} ${val?.lastName}`}
          </span>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: true
    },
    {
      title: "Payment From",
      dataIndex: "paymentType",
      sorter: true
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      render(val: any) {
        return "$" + val;
      },
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Payments" />
      <div className="fixed bottom-4 right-4 z-999">
        <button onClick={() => router.push('/admin/payments/create')} className="px-4 py-2 font-bold text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90">
          ADD
        </button>
      </div>
      <Table className="mainTable" loading={loading} dataSource={data?.data ?? []} columns={columns} pagination={{
        showQuickJumper: true,
        total: data?.count ?? 0,
        onChange: (page, pageSize) => {
          setQuery({ "skip": ((page - 1) * pageSize), "take": pageSize });
        },
      }} />
    </>
  );
}