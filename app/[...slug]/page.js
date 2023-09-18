import { notFound } from "next/navigation";

import getPage from "utils/getPage";
import getSEO from "utils/getSEO";

import { BlockRenderer } from "components/BlockRenderer";

// SSR,components will be rendered at the server not the client
const Page = async ({ params: { slug } }) => {
  const blocks = await getPage(slug.join("/"));

  // would not log in the browser but in the server console (SSR)
  console.log({ blocks });

  // renders nextJS 404 if null
  return blocks ? <BlockRenderer blocks={blocks} /> : notFound();
};

// function name is not optional, generateMetadata
export const generateMetadata = async ({ params: { slug } }) => {
  // slug will target the catch all [...slug] directory
  const seo = await getSEO(slug.join("/"));

  return {
    title: seo?.title ?? "",
    description: seo?.metaDesc ?? "",
  };
};

export default Page;
