import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="header">
        <div className="inner-container">
          <div className="head-logo">
            <Link href="/">CPM Publisher API</Link>
          </div>
        </div>
      </div>

      <div className="page-content inner-container">{children}</div>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="logo">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
