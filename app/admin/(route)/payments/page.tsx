"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {Table} from "antd";
import { useFetch } from "@/contexts/useFetch";
const resource = "payments";

export default function Page() {
  const router = useRouter()
  const [query, setQuery] = useState({ "skip": "0", "take": "10" })
  const { data, loading } = useFetch({ url: resource, query: JSON.stringify(query) });

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      sorter: true,
      render(val: any) {
        return val?.name;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
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
      }} />
    </>
  );
}