export const relativeToAbsoluteUrls = (htmlString = "") =>
  htmlString.split(process.env.NEXT_PUBLIC_WP_URL).join(""); // removes first path of URL
