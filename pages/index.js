import { Page } from "components/Page";
import { getPageStaticProps } from "utils/getPageStaticProps";

// NextJS builtin function getStaticProps
// runs server side
export const getStaticProps = getPageStaticProps;

export default Page;
