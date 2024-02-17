import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';

export function ViewData({ data }: any) {
    const [user, setUser] = useState([])

    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(data))
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
            setUser(user)
        }
    }, [data])

    return (
        <>
            <Descriptions title="User" items={user} />
            <Descriptions title="Company">
                <Descriptions.Item label="Details">{data?.companyDel}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Docs">
                {data?.docs && data?.docs.map((item: any, key: any) => <Descriptions.Item key={key} label={item.name}><img width={100} src={item.file} /></Descriptions.Item>)}
            </Descriptions>
            <Descriptions title="Tags">
                {/* {data?.tags && data?.tags.map((item: any, key: any) => <Descriptions.Item key={key} label={'Name'}>{item}</Descriptions.Item>)} */}
            </Descriptions>
        </>
    );
}