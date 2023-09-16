import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getSearchParams } from "utils/getSearchParams";

import { Pagination } from "./Pagination";
import { Results } from "./Results";
import { SearchFilters } from "./SearchFilters";

const paginationSize = parseInt(process.env.PAGINATION_SIZE);

export const PropertySearch = () => {
  const [properties, SetProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const router = useRouter();

  const search = async () => {
    const searchParams = getSearchParams();

    // const { page, hasParking, petFriendly, minPrice, maxPrice } =
    //   queryString.parse(window.location.search);

    // const searchParams = {
    //   ...(page && { page: parseInt(page) }), // only fill if not undefined...
    //   ...(hasParking && { hasParking: parseInt(hasParking) }),
    //   ...(petFriendly && { petFriendly: parseInt(petFriendly) }),
    //   ...(minPrice && { minPrice: parseInt(minPrice) }),
    //   ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
    // };

    console.log({ searchParams });

    const response = await fetch(`/api/search`, {
      method: "POST", // changed to post because now request has parameters (?)
      body: JSON.stringify({
        // page: parseInt(page), // null if not in the Url param chain
        ...searchParams,
      }),
    });
    const data = await response.json(); // serializes received data

    console.log("Search: ", { data });
    SetProperties(data.properties);
    setTotalProperties(data.totalProperties);
  };

  // runs on load component as no dependencies are set
  useEffect(() => {
    search();
  }, []);

  const handlePagination = async (pageNumber) => {
    const searchParams = getSearchParams();

    const filterQuery =
      (searchParams.hasParking
        ? `&hasParking=${searchParams.hasParking}`
        : "") +
      (searchParams.petFriendly
        ? `&petFriendly=${searchParams.petFriendly}`
        : "") +
      (searchParams.minPrice ? `&minPrice=${searchParams.minPrice}` : "") +
      (searchParams.maxPrice ? `&maxPrice=${searchParams.maxPrice}` : "");

    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}${filterQuery}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  console.log("PropertySearch, ", { paginationSize });

  const handleSearch = async ({
    hasParking,
    petFriendly,
    minPrice,
    maxPrice,
  }) => {
    // update browser url
    // search by filters
    console.log(
      "PropertySearch, handelSearch: ",
      { hasParking },
      { petFriendly },
      { minPrice },
      { maxPrice }
    );

    const filterQuery =
      (hasParking ? `&hasParking=${hasParking}` : "") +
      (petFriendly ? `&petFriendly=${petFriendly}` : "") +
      (minPrice ? `&minPrice=${minPrice}` : "") +
      (maxPrice ? `&maxPrice=${maxPrice}` : "");

    console.log({ filterQuery });

    await router.push(
      `${router.query.slug.join("/")}?page=1${filterQuery}`,
      null,
      {
        shallow: true,
      }
    );

    search();
  };

  return (
    <>
      {/* <pre>{JSON.stringify(properties)}</pre> */}
      <SearchFilters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        totalPages={Math.ceil(totalProperties / paginationSize)}
        onPaginationClick={handlePagination}
      />
    </>
  );
};
