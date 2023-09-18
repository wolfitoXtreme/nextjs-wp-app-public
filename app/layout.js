import { Poppins, Aboreto } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";

import { getMenu } from "utils/getMenu";

import { MainMenu } from "components/MainMenu";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false; // removes icon resizing on reload (caused by SSR)

// fonts configuration
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins", // TailWind variable name
});

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-aboreto", // TailWind variable name
});

const { Children } = require("react");

// RootLayout will always wrap any other page
const RootLayout = async ({ children }) => {
  const { menuItems, callToActionButton } = await getMenu();

  return (
    <html lang="en" className={`${poppins.variable} ${aboreto.variable}`}>
      <head>
        <title></title>
      </head>
      <body className="font-body">
        <MainMenu
          menuItems={menuItems}
          callToActionButton={callToActionButton}
        />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
