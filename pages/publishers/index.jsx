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
        {console.log("record", record._id)}

        <a href={`/publishers/${record._id}`}>{text}</a>
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
  const [refresh, setRefresh] = useState(false);

  const [data, setData] = useState([]);
  const [orgingalData, setOrignalData] = useState([]);

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

        // setOrignalData(modifiedData);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);

  const onDeleteEntries = async () => {
    try {
      const res = await fetch("/api/googleSheetDB", {
        method: "DELETE",
      });

      console.log("delete", res);
    } catch (err) {
      console.log("delete err", err);
    }
  };

  const onUploadEntries = async () => {
    try {
      const res = await fetch("/api/googleSheetDB", {
        method: "POST",
      });

      console.log("upload res", res);
    } catch (err) {
      console.log("upload err", err);
    }
  };

  const onRefresh = () => {
    setRefresh(!refresh);
  };

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

  return (
    <Layout>
      <section>
        <Spin size="large" spinning={loading}>
          {" "}
          <Title level={3}>All Publishers</Title>
        </Spin>

        <div className="group">
          <Space size={[16, 16]} wrap>
            {data.length ? (
              <div className="deleteBtn">
                <button
                  onClick={() => {
                    onRefresh();
                    onDeleteEntries();
                  }}
                >
                  Delete All - Entries
                </button>
              </div>
            ) : (
              <div className="uploadBtn">
                <button
                  onClick={() => {
                    onRefresh();
                    onUploadEntries();
                  }}
                >
                  Upload Google Sheet - Entries
                </button>
              </div>
            )}

            <div className="refreshBtn">
              <button onClick={onRefresh}>Refresh</button>
            </div>
            <Search
              placeholder="Search Ad Unit Name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Space>
        </div>
        <div>
          <Table
            // pagination={{
            //   position: ["topRight", "bottomRight"],
            // }}
            dataSource={data}
            columns={columns}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Publishers;
