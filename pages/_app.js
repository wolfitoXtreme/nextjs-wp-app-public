import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <div className="font-body">
    <Component {...pageProps} />
  </div>
);

export default MyApp;
