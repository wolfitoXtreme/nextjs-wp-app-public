const getSEO = async (uri) => {
  const params = {
    query: `
    query SEOQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          seo {
            title
            metaDesc
          }
        }
        ... on Property {
          seo {
            title
            metaDesc
          }
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
    data: {
      nodeByUri: { seo },
    },
  } = await response.json();

  return seo;
};

export default getSEO;
