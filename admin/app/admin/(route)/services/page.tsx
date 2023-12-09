"use client"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  Table,
  Tag,
  Button,
  Avatar,
  Dropdown,
  Menu
} from "antd";
import { useFetch } from "@/contexts/useFetch";
import { CiMenuKebab } from "react-icons/ci";
import { FormData } from "./FormData";
import { CreateDataModal, EditDataModal, DeleteDataModal, StatusDataModal } from "@/components/Forms";
const resource = "services";

export default function Page() {
  const [detail, setDetail] = useState<any>(null);

  const [query, setQuery] = useState({ "skip": "0", "take": "10" })
  const { data, loading } = useFetch({ url: resource, query: JSON.stringify(query) });

  const refreshData = () => {
    setQuery({ "skip": "0", "take": "10" })
    setDetail(null)
  }

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      render: (text: any) => <Avatar shape="square" src={<img src={"http://localhost:3000" + (text ? text : "/images/user.png")} alt="" />} />

    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render(val: any) {
        return (
          <span>
            {`${val}`}
          </span>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: (_value: any, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "edit": true })}
                >
                  EDIT
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "delete": true })}
                >
                  DELETE
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" onClick={(e) => e.preventDefault()}>
            <CiMenuKebab />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Services" />
      <div className="fixed bottom-4 right-4 z-999">
        <button onClick={() => setDetail({ "add": true })} className="px-4 py-2 font-bold text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90">
          ADD
        </button>
      </div>
      <Table className="mainTable" loading={loading} dataSource={data?.data ?? []} columns={columns} pagination={{
        showQuickJumper: true,
        total: data?.count ?? 0,
      }} />
      {(detail && detail.add) && (<CreateDataModal resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.edit) && (<EditDataModal resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.delete) && (<DeleteDataModal resource={resource} close={refreshData} data={detail} />)}
      {(detail && detail.active) && (<StatusDataModal resource={resource} close={refreshData} data={detail} />)}
    </>
  );
}