import Link from "next/link";
import Layout from "../components/Layout/layout";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <section className="card-container">
        <div className="card">
          <Link href="/publishers">Publishers - Database</Link>
        </div>
        {/* <div className="card">
          <Link href="/google-sheet-data">Publishers - Google Sheets</Link>
        </div> */}
      </section>
    </Layout>
  );
}
