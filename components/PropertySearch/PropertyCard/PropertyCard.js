import Link from "next/link";
import Image from "next/image"; // NextJS image component
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBathtub,
  faBed,
  faCar,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({
  uri,
  title,
  bathrooms,
  bedrooms,
  hasParking,
  petFriendly,
  price,
  imageUrl,
}) => {
  console.log({ bedrooms });
  return (
    <Link
      href={uri}
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full max-w-[300px] h-0 pb-[100%] overflow-hidden relative bg-slate-300">
            {imageUrl && (
              <Image
                src={imageUrl}
                sizes="300px" // can take different sizes for different screen sizes
                fill
                alt=""
                className="w-full h-full object-cover absolute"
              />
            )}
          </div>
          <div className="mt-3 text-lg font-bold">{title}</div>

          <b>&euro;{numeral(price).format(0, 0)}</b>

          <div className="flex justify-between text-sm mt-3">
            <div>
              <FontAwesomeIcon icon={faBathtub} />
              <span className="pl-2">{bathrooms}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBed} />
              <span className="pl-2">{bedrooms}</span>
            </div>
          </div>

          {(hasParking || petFriendly) && (
            <div className="flex justify-between text-sm mt-3">
              {hasParking && (
                <div>
                  <FontAwesomeIcon icon={faCar} />
                  <span className="pl-2">Parking available</span>
                </div>
              )}
              {petFriendly && (
                <div>
                  <FontAwesomeIcon icon={faDog} />
                  <span className="pl-2">pet friendly</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* {JSON.stringify(featuredImage, null, 2)} */}
      </div>
    </Link>
  );
};
