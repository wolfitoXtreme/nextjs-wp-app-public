import { PropertyCard } from "../PropertyCard";

export const Results = ({ properties }) => (
  <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
    {properties.map((property) => {
      // Compose props from null/undefined? keys to set default values
      const { featuredImage, propertyFeatures, ...rest } = property;
      const propertyProps = {
        ...rest,
        bathrooms: propertyFeatures.bathrooms ?? 0,
        bedrooms: propertyFeatures.bedrooms ?? 0,
        hasParking: propertyFeatures.hasParking ?? false,
        petFriendly: propertyFeatures.petFriendly ?? false,
        price: propertyFeatures.price, // default is 0 in DB no need of Nullish coalescing operator
        imageUrl: featuredImage?.node?.sourceUrl ?? undefined,
      };

      // console.log({ propertyProps });

      return <PropertyCard key={property.databaseId} {...propertyProps} />;
    })}
  </div>
);
