import { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";

import styles from "../../styles/Home.module.css";

export default function GoogleSheetData() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/googleSheetDB")
      .then((res) => res.json())
      .then((data) => {
        console.log("my data", data.data);
        setData(data.data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
        Publishers - Google Sheets
      </h1>

      <section className={styles.tableContainer}>
        <div>Total: {data.body.length}</div>
        <table className={styles.table}>
          {/* <caption>Publisher Database</caption> */}

          <thead>
            <tr>
              {data.head.map((info) => (
                <th className={styles.tableContent} key={info}>
                  {info}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.body.map((info) => (
              <tr key={info}>
                {info.map((item) => (
                  <td className={styles.tableContent} key={item}>
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
