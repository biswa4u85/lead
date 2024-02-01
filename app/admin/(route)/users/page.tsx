"use client"
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  Table,
  Tag,
  Button,
  Dropdown,
  Menu,
  Avatar
} from "antd";
import { useFetchByLoad } from "@/contexts/useFetchByLoad";
import { CiMenuKebab } from "react-icons/ci";
import { FormData } from "./FormData";
import { CreateDataDrawer, EditDataDrawer, DeleteDataModal, StatusDataModal } from "@/components/Forms";
const resource = "users";

export default function Page() {
  const [detail, setDetail] = useState<any>(null);

  const [query, setQuery] = useState({ "role": "user", "skip": 0, "take": 10 })
  const { fetch, data, loading } = useFetchByLoad({ url: resource, query: JSON.stringify(query) });

  useEffect(() => {
    fetch()
  }, [query])

  const refreshData = () => {
    fetch()
    setDetail(null)
  }

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'image',
      render: (text: any) => <Avatar shape="square" src={<img src={text ? text : "/images/user.png"} alt="" />} />
    },
    {
      title: "Full Name",
      dataIndex: "name",
      sorter: true,
      render(_: any, val: any) {
        return (
          <span>
            {`${val?.firstName} ${val?.lastName}`}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      sorter: true,
      render(val: any) {
        return "$" + val;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render(val: any) {
        return <Tag color={val == "active" ? "success" : "error"}>{val}</Tag>;
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
                  onClick={() => setDetail({ ...record, "active": true })}
                >
                  {record.status == "active" ? "INACTIVE" : "ACTIVE"}
                </Button>
              </Menu.Item>
              <Menu.Item key="3">
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
      <Breadcrumb pageName="Users" />
      <div className="fixed bottom-4 right-4 z-999">
        <button onClick={() => setDetail({ "add": true })} className="px-4 py-2 font-bold text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90">
          ADD
        </button>
      </div>
      <Table className="mainTable" loading={loading} dataSource={data?.data ?? []} columns={columns} pagination={{
        showQuickJumper: true,
        total: data?.count ?? 0,
        onChange: (page, pageSize) => {
          setQuery({ "role": "user", "skip": ((page - 1) * pageSize), "take": pageSize });
        },
      }} />
      {(detail && detail.add) && (<CreateDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.edit) && (<EditDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.delete) && (<DeleteDataModal resource={resource} close={refreshData} data={detail} />)}
      {(detail && detail.active) && (<StatusDataModal resource={resource} close={refreshData} data={detail} />)}
    </>
  );
}