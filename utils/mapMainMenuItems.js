import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  // {menuItem, items}
  return menuItems.map((menuItem) => {
    const {
      // label, destination, might not exist
      menuItem: { label = null, destination: { uri } = {} },
      items: submenuItems, // this one is set to null so cannot be assigned with a default value
    } = menuItem;

    console.log("mapMainMenuItems: ", { label }, { uri }, { submenuItems });

    return {
      id: uuid(),
      label,
      destination: uri,
      // items might not exist
      submenuItems: (submenuItems || []).map((submenuItem) => {
        console.log("mapMainMenuItems: ", { submenuItem });
        // destination might not exist
        const { label, destination: { uri } = {} } = submenuItem;

        return {
          id: uuid(),
          label,
          destination: uri,
        };
      }),
    };
  });
};
