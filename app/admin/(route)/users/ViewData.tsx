import { Descriptions, Image, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from "@/contexts/useFetch";

export function ViewData({ data }: any) {
    const [user, setUser] = useState([])
    const [tagIds, setTagIds] = useState([]);
    const [tags, setTags] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [category_newIds, setCategory_newIds] = useState([]);
    const [cityIds, setcityIds] = useState([]);

    const { data: allTags } = useFetch({ url: "tags", query: JSON.stringify({ ids: tagIds }) });
    const { data: batiments } = useFetch({ url: "batimentCategorys", query: JSON.stringify({ showAll: true, ids: categoryIds }) });
    const { data: depannages } = useFetch({ url: "depannageCategorys", query: JSON.stringify({ showAll: true, ids: category_newIds }) });
    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({ ids: cityIds }) });

    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(data))
        let tags = newData?.tags ? newData.tags.map((item: any) => item.label) : []
        let categorys = newData?.category ? newData?.category : []
        let category_news = newData?.category_new ? newData?.category_new : []
        let citys = newData?.citys ? newData?.citys : []
        if (newData) {
            delete newData.id
            delete newData.emailVerified
            delete newData.password
            delete newData.sponsorCode
            delete newData.image
            delete newData.createdAt
            delete newData.updatedAt
            delete newData.docs
            delete newData.category
            delete newData.category_new
            delete newData.citys
            delete newData.tags
            delete newData.companyDel

            let user: any = []
            for (let key in newData) {
                user.push({
                    label: key,
                    children: newData[key],
                })
            }
            setTagIds(tags)
            setCategoryIds(categorys)
            setCategory_newIds(category_news)
            setcityIds(citys)
            setUser(user)
        }
    }, [data])

    useEffect(() => {
        if (allTags?.data && data?.tags) {
            let tags: any = []
            for (let item of data?.tags) {
                let tag = allTags.data.find((it: any) => it.id == item.label)
                item['name'] = tag?.name ?? ''
                tags.push(item)
            }
            setTags(tags)
        }
    }, [allTags])

    return (
        <>
            <Descriptions title="User" items={user} />

            <hr /><br />
            
            <Descriptions title="Company">
                <Descriptions.Item label="Details">{data?.companyDel}</Descriptions.Item>
            </Descriptions>

            <hr /><br />

            <Descriptions title="Docs" column={3}>
                {data?.docs && data?.docs.map((item: any, key: any) => <Descriptions.Item key={key}>
                    <Space size={12} direction="vertical">
                        <h3>{item.name}</h3>
                        <Image
                            width={200}
                            src={item.file}
                            placeholder={
                                <Image
                                    preview={false}
                                    src={item.file}
                                    width={200}
                                />
                            }
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                let newTab: any = window.open('', '_blank');
                                newTab.location.href = item.file;
                            }}
                        >
                            Download
                        </Button>
                    </Space>
                </Descriptions.Item>)}
            </Descriptions>
            
            <hr /><br />

            <Descriptions title="Labels" column={3}>
                {tags.map((item: any, key: any) => <Descriptions.Item key={key}>
                    <Space size={12} direction="vertical">
                        <h3>{item.name}</h3>
                        <Image
                            width={200}
                            src={item.file}
                            placeholder={
                                <Image
                                    preview={false}
                                    src={item.file}
                                    width={200}
                                />
                            }
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                let newTab: any = window.open('', '_blank');
                                newTab.location.href = item.file;
                            }}
                        >
                            Download
                        </Button>
                    </Space>
                </Descriptions.Item>)}
            </Descriptions>
            
            <hr /><br />

            <Descriptions title="Batiment Categorys">
                {batiments?.data && batiments?.data.map((item: any, key: any) => <Descriptions.Item key={key} label={'Name'}>{item.name}</Descriptions.Item>)}
            </Descriptions>

            <hr /><br />

            <Descriptions title="Depannage Categorys">
                {depannages?.data && depannages?.data.map((item: any, key: any) => <Descriptions.Item key={key} label={'Name'}>{item.name}</Descriptions.Item>)}
            </Descriptions>
            
            <hr /><br />

            <Descriptions title="Citys">
                {zipcodes?.data && zipcodes?.data.map((item: any, key: any) => <Descriptions.Item key={key} label={'Name'}>{item.name}</Descriptions.Item>)}
            </Descriptions>
        </>
    );
}