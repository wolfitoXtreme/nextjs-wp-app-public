import getPage from "utils/getPage";
import getSEO from "utils/getSEO";

import { BlockRenderer } from "components/BlockRenderer";

// SSR,components will be rendered at the server not the client
const Home = async () => {
  const blocks = await getPage("/");

  // would not log in the browser but in the server console (SSR)
  console.log({ blocks });

  return <BlockRenderer blocks={blocks} />;
};

// function name is not optional, generateMetadata
export const generateMetadata = async () => {
  const seo = await getSEO("/");

  return {
    title: seo?.title ?? "",
    description: seo?.metaDesc ?? "",
  };
};

export default Home;
