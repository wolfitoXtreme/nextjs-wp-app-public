import { Input } from "components/Input";
import { useEffect, useState } from "react";

import { getSearchParams } from "utils/getSearchParams";

export const SearchFilters = ({ onSearch }) => {
  const [hasParking, setHasParking] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [minPrice, setMinPrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(false);

  useEffect(() => {
    // need to set the initial state from Url parameters if defined
    const searchParams = getSearchParams();

    searchParams?.hasParking && setHasParking(searchParams?.hasParking);
    searchParams?.petFriendly && setPetFriendly(searchParams?.petFriendly);
    searchParams?.minPrice && setMinPrice(searchParams?.minPrice);
    searchParams?.maxPrice && setMaxPrice(searchParams?.maxPrice);

    console.log("useEffect searchParams: ", { searchParams });
  }, []);

  const handleFilteredSearch = () => {
    // search function passed as a prop
    onSearch({
      hasParking,
      petFriendly,
      minPrice,
      maxPrice,
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
      <div className="max-w-5xl mx-auto m-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
        <div className="flex-1 flex flex-col">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly((value) => !value)}
            />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>

        <div className="flex-1">
          <span>Min price</span>
          <Input
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </div>

        <div className="flex-1">
          <span>Max price</span>
          <Input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>

        <div className="link-button" onClick={handleFilteredSearch}>
          Filter
        </div>
      </div>
    </>
  );
};
