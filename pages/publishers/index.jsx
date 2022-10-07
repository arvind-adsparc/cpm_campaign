import { useState, useEffect } from "react";
import { Typography, Spin, Space, Table, Input } from "antd";
import Layout from "../../components/Layout/layout";
import Link from "next/link";

const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Ad Unit Name",
    dataIndex: "adUnitName",
    key: "adUnitName",
    width: "300",
    render: (text, record) => (
      <Space size="middle">
        {/* <Link> {text}</Link> */}
        {text}
      </Space>
    ),
  },
  {
    title: "Inventory Type",
    dataIndex: "inventoryType",
    key: "inventoryType",
  },
  {
    title: "Partner",
    dataIndex: "partner",
    key: "partner",
  },
  {
    title: "App Name",
    dataIndex: "appName",
    key: "appName",
  },
  {
    title: "Gaming Inventory Type",
    dataIndex: "gamingInventoryType",
    key: "gamingInventoryType",
  },

  {
    title: "Categories",
    dataIndex: "categories",
    key: "categories",
  },
  {
    title: "Appstore",
    dataIndex: "appStore",
    key: "appStore",
  },
  {
    title: "Ad Format",
    dataIndex: "adFormat",
    key: "adFormat",
  },
  {
    title: "App ID",
    dataIndex: "appId",
    key: "appId",
  },

  {
    title: "Publisher Net Price ($)",
    dataIndex: "publisherNetPrice",
    key: "publisherNetPrice",
  },
  {
    title: "GAM CPM",
    dataIndex: "gamCpm",
    key: "gamCpm",
  },
  {
    title: "Adsparc Margin on Media ( 25%)",
    dataIndex: "adSparcMarignMedia",
    key: "adSparcMarignMedia",
  },
];

const Publishers = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [orgingalData, setOrignalData] = useState([]);

  const onSearch = (value) => {
    if (value) {
      const searchedData = data.filter((info) =>
        info.adUnitName.includes(value)
      );

      setData(searchedData);
      console.log(searchedData);
    } else {
      setData(orgingalData);
    }
  };

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const response = await fetch("/api/publishers");
        const result = await response.json();

        console.log("result", result);

        const modifiedData = result.data.map((info) => {
          return { key: info._id, ...info };
        });

        setData(modifiedData);

        setOrignalData(modifiedData);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Layout>
      <section>
        <Spin size="large" spinning={loading}>
          {" "}
          <Title level={3}>All Publishers</Title>
        </Spin>

        <div>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div>
          <Table
            pagination={{
              position: ["topRight", "bottomRight"],
            }}
            dataSource={data}
            columns={columns}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Publishers;
