import { LinkButton } from "components/LinkButton";
import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa";

export const MainMenu = ({
  menuItems,
  callToActionButton: {
    label: callToActionLabel,
    destination: callToActionDestination,
  },
}) => {
  console.log("MAIN MENU:", { menuItems }, menuItems.length);
  return (
    <nav className="bg-slate-800 text-white px-5 h-16 sticky top-0 z-20 flex">
      <ul className="py-4 pl-5 flex text-pink-600">
        <li>
          <FaHouseUser size={30} />
        </li>
        <li>
          <FaHeart size={30} />
        </li>
      </ul>

      {menuItems && (
        <ul className="flex ml-auto">
          {menuItems.map(({ id, label, destination, submenuItems }) => (
            <li
              key={id}
              className="hover:bg-slate-700 cursor-pointer relative group"
            >
              <Link href={destination} className="p-5 block">
                {label}
              </Link>

              {/* submenuItems */}

              {!!submenuItems.length && (
                <ul className="left-0 top-full group-hover:block hidden bg-slate-800 absolute">
                  {submenuItems.map(({ id, label, destination }) => (
                    <li key={id}>
                      <Link
                        href={destination}
                        className="p-5 whitespace-nowrap block hover:bg-slate-700"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <LinkButton
        label={callToActionLabel}
        destination={callToActionDestination}
      />
    </nav>
  );
};
