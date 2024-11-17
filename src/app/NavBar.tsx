import logo from "@/assets/logo.png";
import { getWixServerClient } from "@/lib/wix-client.server";

import { getCart } from "@/wixAPI/cartContext";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";

import { getCollections } from "@/wixAPI/collectionContext";
import MainNavigation from "./MainNavigation";
import SearchField from "@/components/SearchField";
import MobileMenu from "./MobileMenu";
import { Suspense } from "react";

export default async function Navbar() {
  const wixClient = await getWixServerClient();

  const [cart, collections] = await Promise.all([
    getCart(wixClient),

    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">T Shop</span>
          </Link>

          <Suspense>
            <MobileMenu collections={collections} />
          </Suspense>

          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>

        <SearchField className="hidden max-w-96 lg:inline" />

        <div className="flex items-center justify-center gap-5">
          <UserButton className="hidden lg:inline-flex" />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
