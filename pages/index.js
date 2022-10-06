import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
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
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline">CPM Database API</h1>

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
    </div>
  );
}
