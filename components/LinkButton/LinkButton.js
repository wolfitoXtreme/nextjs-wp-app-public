import Link from "next/link";

export const LinkButton = ({ label, destination }) => {
  return (
    <Link href={destination} className="link-button inline-block">
      {label}
    </Link>
  );
};
