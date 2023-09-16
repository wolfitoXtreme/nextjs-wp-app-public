import { faBath, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";

export const PropertyFeatures = ({
  price,
  bedrooms,
  bathrooms,
  hasParking,
  petFriendly,
}) => (
  <div className="max-w-lg mx-auto my-10 bg-white text-center text-slate-900 p-5">
    <div className="grid grid-cols-2 mb-4 gap-y-5">
      <div>
        <FontAwesomeIcon icon={faBed} />
        {bedrooms} Bedrooms
      </div>
      <div>
        <FontAwesomeIcon icon={faBath} />
        {bathrooms} Bathrooms
      </div>
      {hasParking && (
        <div>
          <FontAwesomeIcon icon={faCar} /> Parking available
        </div>
      )}
      {petFriendly && (
        <div>
          <FontAwesomeIcon icon={faDog} /> Pet friendly
        </div>
      )}
    </div>
    <h3 className="text-5xl font-bold">&euro;{numeral(price).format("0,0")}</h3>
  </div>
);
