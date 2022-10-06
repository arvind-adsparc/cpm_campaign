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

      <section>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {data.head.map((info) => (
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  key={info}
                >
                  {info}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.body.map((info) => (
              <tr key={info}>
                {info.map((item) => (
                  <td
                    key={item}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
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
