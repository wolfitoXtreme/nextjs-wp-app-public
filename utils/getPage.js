import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

const getPage = async (uri) => {
  const params = {
    query: `
    query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          blocks
        }
        ... on Property {
          blocks
        }
      }
    }
    `,
    variables: {
      uri,
    },
  };

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  // extracts data to set as props in all pages
  const {
    data: { nodeByUri },
  } = await response.json();

  const blocks = nodeByUri ? cleanAndTransformBlocks(nodeByUri.blocks) : null;

  console.log("getPage: ", { blocks });

  return blocks;
};

export default getPage;
