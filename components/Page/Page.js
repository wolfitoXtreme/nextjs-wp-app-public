import Head from "next/head";

import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";

export const Page = ({ seo, menuItems, callToActionButton, blocks }) => (
  <>
    {/* <pre>{JSON.stringify(seo, null, 2)}</pre> */}
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.metaDesc} />
    </Head>
    <MainMenu menuItems={menuItems} callToActionButton={callToActionButton} />
    <BlockRenderer blocks={blocks} />
  </>
);
