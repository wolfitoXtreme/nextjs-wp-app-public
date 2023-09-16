import { gql } from "@apollo/client";
import client from "client";

const paginationSize = parseInt(process.env.PAGINATION_SIZE);

const handler = async (req, res) => {
  console.log("search handler...", req.body);
  try {
    const { page = 1, ...otherParameters } = {
      ...JSON.parse(req.body),
    };

    const pageOffset = (page - 1) * paginationSize; // will increase by paginationSize

    // compose metaArray query
    const metaArray = Object.entries(otherParameters)
      .map((entry) => {
        // console.log({entry});
        switch (entry[0]) {
          case "hasParking": {
            return `
          {
            key: "has_parking"
            compare: EQUAL_TO
            value: "1"
          },
          `;
          }
          case "petFriendly": {
            return `
          {
            key: "pet_friendly"
            compare: EQUAL_TO
            value: "1"
          },
          `;
          }
          case "minPrice": {
            return `
          {
            key: "price"
            compare: GREATER_THAN_OR_EQUAL_TO
            value: "${entry[1]}"
            type: NUMERIC
          },
          `;
          }
          case "maxPrice": {
            return `
          {
            key: "price"
            compare: LESS_THAN_OR_EQUAL_TO
            value: "${entry[1]}"
            type: NUMERIC
          },
          `;
          }
          default: {
            return "";
          }
        }
      })
      .join("");

    console.log(
      "search handler page:::",
      { page },
      { paginationSize },
      { pageOffset },
      { otherParameters },
      { metaArray },
      JSON.parse(req.body)
    );

    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties(where: {
            offsetPagination: { offset: ${pageOffset}, size: ${paginationSize} }
            ${
              metaArray &&
              `
              metaQuery: {
                relation: AND
                metaArray: [${metaArray}]
              }
              `
            }
          }) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
          }
        }
      `,
    });
    console.log("data...", { data });

    const {
      properties: {
        nodes, // each node is a property
        pageInfo: {
          offsetPagination: { total },
        },
      },
    } = data;

    return res.status(200).json({
      totalProperties: total,
      properties: nodes,
    });
  } catch (error) {
    console.error({ error });
  }
};

export default handler;
