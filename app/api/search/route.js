// all directories within api, should have this name assigned
// 'route.js' if intended as an endpoint so NextJS recognizes it as such,
// 'route.js' and 'page.js' cannot coexist within the same directory
import { NextResponse } from "next/server";

const paginationSize = parseInt(process.env.PAGINATION_SIZE);

// using request object from web api
export async function POST(request) {
  try {
    const { page = 1, ...otherParameters } = {
      ...(await request.json()),
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

    const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
      }),
    });
    const { data } = await response.json();

    const {
      properties: {
        nodes, // each node is a property
        pageInfo: {
          offsetPagination: { total },
        },
      },
    } = data;

    return NextResponse.json({
      totalProperties: total,
      properties: nodes,
    });
  } catch (error) {
    console.error({ error });
  }
}
