import { gql } from "@apollo/client";
import client from "client";

import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "utils/mapMainMenuItems";

// runs server side
export const getPageStaticProps = async (context) => {
  console.log("getPageStaticProps:", { context });

  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/"; // reconstruct uri from getStaticPaths

  const { data } = await client.query({
    // nodeByUri: pages WP blocks
    // acfOptionsMainMenu: Menu Items
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks
            seo {
              title
              metaDesc
            }
          }
          ... on Property {
            id
            title
            blocks
            seo {
              title
              metaDesc
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
        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }

            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  // extracts data to set as props in all pages
  const {
    nodeByUri: { title, blocks, propertyFeatures, seo },
    acfOptionsMainMenu: {
      mainMenu: { menuItems, callToActionButton },
    },
  } = data;

  console.log(
    "\n\n::::::::::::::BEGIN:::::::::::::::\n",
    `getPageStaticProps, :::${title}:::\n`,
    { propertyFeatures },
    { blocks },
    { menuItems },
    { callToActionButton },
    { data },
    "\n:::::::::::::::END::::::::::::::\n\n"
  );

  return {
    props: {
      seo,
      title,
      menuItems: mapMainMenuItems(menuItems),
      callToActionButton: {
        label: callToActionButton.label,
        destination: callToActionButton.destination.uri,
      },
      blocks: cleanAndTransformBlocks(blocks), // blocks with Ids
      propertyFeatures: propertyFeatures || null,
    },
  };
};
