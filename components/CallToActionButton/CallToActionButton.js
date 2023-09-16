import { LinkButton } from "components/LinkButton";

export const CallToActionButton = ({ label, destination, align }) => {
  return (
    <div className={`text-${align}`}>
      <LinkButton label={label} destination={destination} />
    </div>
  );
};
