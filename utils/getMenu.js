import { mapMainMenuItems } from "utils/mapMainMenuItems";

export const getMenu = async () => {
  const params = {
    query: `
    query MenuQuery {
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
  };

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  // extracts data to set as props in all pages
  const { data } = await response.json();

  const {
    acfOptionsMainMenu: {
      mainMenu: { menuItems, callToActionButton },
    },
  } = data;

  return {
    menuItems: mapMainMenuItems(menuItems),
    callToActionButton: {
      label: callToActionButton.label,
      destination: callToActionButton.destination.uri,
    },
  };
};
