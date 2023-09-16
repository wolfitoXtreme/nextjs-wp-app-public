import queryString from "query-string"; // pass a query string into an object

export const getSearchParams = () => {
  console.log("getSearchParams: ", queryString.parse(window.location.search));

  const params = Object.entries(
    // will return any url parameters defined as an object
    queryString.parse(window.location.search)
  ).reduce((acc, entry) => {
    console.log({ entry });
    return { ...acc, [entry[0]]: entry[1] };
  }, {});

  return params;
};
