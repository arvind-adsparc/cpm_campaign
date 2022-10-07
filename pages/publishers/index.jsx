import { useState, useEffect } from "react";

import { Typography, Spin, Space, Table, Button } from "antd";
import Layout from "../../components/Layout/layout";

const { Title } = Typography;

const columns = [
  {
    title: "Ad Unit Name",
    dataIndex: "adUnitName",
    key: "adUnitName",
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

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const response = await fetch("/api/publishers");
        const result = await response.json();

        console.log("result", result);

        const modifiedData = result.data.map((info) => {
          return { ...info };
        });

        setData(modifiedData);

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
          <Table dataSource={data} columns={columns} />
        </div>
      </section>
    </Layout>
  );
};

export default Publishers;
