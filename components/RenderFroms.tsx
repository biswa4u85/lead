import React, { useState, useRef } from "react";
import { Field } from "formik";
import { Avatar, DatePicker, Select, TreeSelect, Switch } from "antd";
import SiteApis from "@/contexts/SiteApis";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
const { SHOW_PARENT } = TreeSelect;

const buildTree = (items: any, parentKey = null) => {
  const map: any = {};
  const roots: any = [];

  // Create a mapping of id to item
  items.forEach((item: any, index: any) => {
    item['title'] = item.name
    item['value'] = item.id
    item['key'] = parentKey ? `${parentKey}-${index}` : `0-${index}`;
    map[item.id] = { ...item, children: [] };
  });


  items.forEach((item: any, key: any) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      roots.push({ ...map[item.id], key: `0-${key}` });
    }
  });

  // console.log(roots)
  return roots;
}

const Buttons = (props: any) => {
  return (
    <button
      type="button"
      disabled={props.loading}
      className="flex justify-center w-full p-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
      {...props}>
      {props.loading && (<div className="w-8 h-8 mr-5 border-t-4 border-blue-100 border-solid rounded-full animate-spin"></div>)}
      {props.loading ? "Processing..." : props.value}
    </button>
  );
};

const InputBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            {props.pre && (<div style={{ position: "absolute", left: 5, top: 10 }}>{props.pre}</div>)}
            {props.post && (<div style={{ position: "absolute", right: 5, top: 10 }}>{props.post}</div>)}
            <input
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              type="text"
              placeholder={props.placeholder}
              className={"w-full p-2 pl-3 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            {props.icon && (<span className="absolute right-4 top-4">{props.icon}</span>)}
          </div>
        </>
      }}
    </Field>
  );
};

const CheckBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            {props.pre && (<div style={{ position: "absolute", left: 5, top: 10 }}>{props.pre}</div>)}
            {props.post && (<div style={{ position: "absolute", right: 5, top: 10 }}>{props.post}</div>)}
            {props.options.map((item: any, key: any) => <label key={key} style={{ padding: 5 }}>
              <input
                type="radio"
                value={field.value}
                checked={field.value === item}
                onChange={(obj) => {
                  form.setFieldValue(props.name, item);
                }}
              />
              {` ${item}`}
            </label>)}
            {/* <input
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              type="text"
              placeholder={props.placeholder}
              className={"w-full p-2 pl-3 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            /> */}
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            {props.icon && (<span className="absolute right-4 top-4">{props.icon}</span>)}
          </div>
        </>
      }}
    </Field>
  );
};

const PasswordBox = (props: any) => {
  const [show, setShow] = useState(false);
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <input
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              type={show ? "text" : "password"}
              placeholder={props.placeholder}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-4">
              <button onClick={() => setShow(!show)}>
                {show ? <FiEye /> : <FiEyeOff />}
              </button>
            </span>
          </div>
        </>
      }}
    </Field>
  );
};

const TextareaBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative w-full">
            <textarea
              rows={6}
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              type="text"
              placeholder={props.placeholder}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

const DateBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <DatePicker
              onChange={(date, obj) => {
                form.setFieldValue(props.name, obj);
              }}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

const SelectBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <select className="relative z-20 w-full px-5 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              {...props}>
              <option value="">{props.placeholder}</option>
              {props.options.map((item: any, key: any) => item && <option key={key} value={item.value}>{item.label}</option>)}
            </select>
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-4"><IoIosArrowDown /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const MultiSelectBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            {props.tree ? <TreeSelect
              allowClear
              style={{
                width: '100%',
              }}
              placeholder={props.placeholder ?? "Please select"}
              value={field.value}
              showCheckedStrategy={SHOW_PARENT}
              onChange={(obj: any) => {
                form.setFieldValue(props.name, obj);
              }}
              treeData={buildTree(props.options)}
              {...props}
            /> : <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder={props.placeholder ?? "Please select"}
              defaultValue={field.value}
              onChange={(obj: any) => {
                form.setFieldValue(props.name, obj);
              }}
              filterOption={(input: any, option: any) => {
                return option.label.toLowerCase().includes(input.toLowerCase())
              }
              }
              options={props.options}
              {...props}
            />}

            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-4"><IoIosArrowDown /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const FileBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {

        const handleFileChange = async (event: any) => {
          const response: any = await SiteApis.fileUploadApi("files", event.target.files[0]);
          if (!response?.error) {
            form.setFieldValue(props.name, response?.url);
          }
        };

        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <input
              onChange={handleFileChange}
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-2"><Avatar shape="square" src={<img src={field.value ? field.value : "/images/user.png"} alt="" />} /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const TogelBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <Switch
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj);
              }}
              placeholder={props.placeholder}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

export {
  Buttons,
  InputBox,
  CheckBox,
  PasswordBox,
  TextareaBox,
  SelectBox,
  MultiSelectBox,
  DateBox,
  TogelBox,
  FileBox
};
