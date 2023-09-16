import { gql } from "@apollo/client";
import client from "client";

import { getPageStaticProps } from "utils/getPageStaticProps";

import { Page } from "components/Page";

// NextJS builtin function getStaticProps
// runs server side
// getStaticPaths needs getStaticProps to be declared (contained here within getPageStaticProps)
export const getStaticProps = getPageStaticProps;

// NextJS builtin function, returns array of routes to make available
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
        properties {
          nodes {
            uri
          }
        }
      }
    `,
  });

  const {
    pages: { nodes },
  } = data;

  return {
    paths: nodes
      .filter((node) => node.uri !== "/")
      .map((node) => ({
        params: {
          // "slug" points to [..slug].js file name
          slug: node.uri.substring(1, node.uri.length - 1).split("/"), // removes slashes, returns uri array
        },
      })),
    fallback: "blocking", // false|blocking -> 404|SSR of oldest pages (10 max?)
  };
};

export default Page;
