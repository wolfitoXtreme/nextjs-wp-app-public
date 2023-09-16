import Head from "next/head";

import { PageContextWrapper } from "context/page";

import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";

export const Page = ({
  seo,
  title,
  menuItems,
  callToActionButton,
  blocks,
  propertyFeatures,
}) => (
  <PageContextWrapper
    value={{
      title,
      propertyFeatures,
    }}
  >
    {/* <pre>{JSON.stringify(seo, null, 2)}</pre> */}
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.metaDesc} />
    </Head>
    <MainMenu menuItems={menuItems} callToActionButton={callToActionButton} />
    <BlockRenderer blocks={blocks} />
  </PageContextWrapper>
);
