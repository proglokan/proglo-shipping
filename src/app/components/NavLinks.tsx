"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, CurrencyDollarIcon, DocumentArrowUpIcon, KeyIcon } from "@heroicons/react/24/solid";
import { UserButton, useOrganizationList, useUser } from "@clerk/nextjs";

const links = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Create Labels",
    href: "/user/create-labels",
    icon: DocumentArrowUpIcon,
  },
  {
    name: "Accounting",
    href: "/user/accounting",
    icon: CurrencyDollarIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { userMemberships, isLoaded } = useOrganizationList({ userMemberships: true });

  // * Render duoplane link if user is apart of duoplane org
  const duoplaneLink = () => {
    if (!isLoaded) return;
    const duoplaneOrg = userMemberships.data.find((data) => data.organization.name === "duoplane");
    if (duoplaneOrg === undefined) return;
    return (
      <Link
        href="/user/duoplane"
        key="Duoplane"
        className={clsx("group flex cursor-pointer items-center gap-4 rounded-xl p-3 hover:bg-purple hover:text-custom-white", {
          "bg-purple text-custom-white": pathname === "/user/duoplane",
        })}
      >
        <KeyIcon className="w-6" />
        <p>Duoplane</p>
      </Link>
    );
  };

  return (
    <>
      <nav className="mx-4 flex flex-col gap-1 border-b border-gray-600/50 py-8  text-lg text-custom-gray">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={clsx("group flex cursor-pointer items-center gap-4 rounded-xl p-3 hover:bg-purple hover:text-custom-white", {
                "bg-purple text-custom-white": pathname === link.href,
              })}
            >
              <LinkIcon className="w-6" />
              <p>{link.name}</p>
            </Link>
          );
        })}
        {duoplaneLink()}
      </nav>
      <div className="mx-6 flex flex-1 items-center gap-4 py-8">
        <UserButton afterSignOutUrl="/" />
        <p>{user ? user.fullName : ""}</p>
      </div>
    </>
  );
}
