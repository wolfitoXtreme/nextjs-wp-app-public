"use client"; // Will render component at client side as needs user input (non static).

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { getSearchParams } from "utils/getSearchParams";

import { Pagination } from "./Pagination";
import { Results } from "./Results";
import { SearchFilters } from "./SearchFilters";

const paginationSize = parseInt(process.env.PAGINATION_SIZE);

export const PropertySearch = () => {
  console.log(":::::::::::::::::");
  return <div>PropertySearch here...</div>;
  // const [properties, SetProperties] = useState([]); // all hooks turn component into Client side ('use client')
  // const [totalProperties, setTotalProperties] = useState(0); // all hooks turn component into Client side ('use client')
  // const router = useRouter(); // all hooks turn component into Client side ('use client')
  // const pathname = usePathname(); // all hooks turn component into Client side ('use client')

  // const search = async () => {
  //   const searchParams = getSearchParams();

  //   // const { page, hasParking, petFriendly, minPrice, maxPrice } =
  //   //   queryString.parse(window.location.search);

  //   // const searchParams = {
  //   //   ...(page && { page: parseInt(page) }), // only fill if not undefined...
  //   //   ...(hasParking && { hasParking: parseInt(hasParking) }),
  //   //   ...(petFriendly && { petFriendly: parseInt(petFriendly) }),
  //   //   ...(minPrice && { minPrice: parseInt(minPrice) }),
  //   //   ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
  //   // };

  //   console.log({ searchParams });

  //   const response = await fetch(`/api/search`, {
  //     method: "POST", // changed to post because now request has parameters (?)
  //     body: JSON.stringify({
  //       // page: parseInt(page), // null if not in the Url param chain
  //       ...searchParams,
  //     }),
  //   });
  //   const data = await response.json(); // serializes received data

  //   console.log("Search: ", { data });
  //   SetProperties(data.properties);
  //   setTotalProperties(data.totalProperties);
  // };

  // // runs on load component as no dependencies are set
  // useEffect(() => {
  //   search();
  // }, []);

  // const handlePagination = async (pageNumber) => {
  //   const searchParams = getSearchParams();

  //   const filterQuery =
  //     (searchParams.hasParking
  //       ? `&hasParking=${searchParams.hasParking}`
  //       : "") +
  //     (searchParams.petFriendly
  //       ? `&petFriendly=${searchParams.petFriendly}`
  //       : "") +
  //     (searchParams.minPrice ? `&minPrice=${searchParams.minPrice}` : "") +
  //     (searchParams.maxPrice ? `&maxPrice=${searchParams.maxPrice}` : "");

  //   router.push(`${pathname}?page=${pageNumber}${filterQuery}`);
  // };

  // console.log("PropertySearch, ", { paginationSize });

  // const handleSearch = async ({
  //   hasParking,
  //   petFriendly,
  //   minPrice,
  //   maxPrice,
  // }) => {
  //   // update browser url
  //   // search by filters
  //   console.log(
  //     "PropertySearch, handelSearch: ",
  //     { hasParking },
  //     { petFriendly },
  //     { minPrice },
  //     { maxPrice }
  //   );

  //   const filterQuery =
  //     (hasParking ? `&hasParking=${hasParking}` : "") +
  //     (petFriendly ? `&petFriendly=${petFriendly}` : "") +
  //     (minPrice ? `&minPrice=${minPrice}` : "") +
  //     (maxPrice ? `&maxPrice=${maxPrice}` : "");

  //   console.log({ filterQuery });

  //   router.push(`${pathname}?page=1${filterQuery}`);
  // };

  // return (
  //   <>
  //     {/* <pre>{JSON.stringify(properties)}</pre> */}
  //     <SearchFilters onSearch={handleSearch} />
  //     <Results properties={properties} />
  //     <Pagination
  //       totalPages={Math.ceil(totalProperties / paginationSize)}
  //       onPaginationClick={handlePagination}
  //     />
  //   </>
  // );
};
