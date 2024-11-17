import banner from "@/assets/banner.jpg";
import Products from "@/components/Products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getWixServerClient } from "@/lib/wix-client.server";

import { getCollectionBySlug } from "@/wixAPI/collectionContext";
import { queryProducts } from "@/wixAPI/productsContext";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            More than just selling online. Less than you’d expect to pay.
          </h1>
          <p>Sell in more ways with a free online store.</p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="T Shop banner"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  const wixClient = await getWixServerClient();

  const collection = await getCollectionBySlug(wixClient, "featured-products");

  if (!collection?._id) {
    return null;
  }

  // const featuredProducts = await wixClient.products
  //   .queryProducts()
  //   .hasSome("collectionIds", [collection?._id]) //fetch by collection._id
  //   .descending("lastUpdated")
  //   .find(); // execute this qiery

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="sm flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>

      {/* // `show all products at Wix  - for developer`
      <pre>{JSON.stringify(featuredProducts, null, 2)}</pre> */}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[24rem] w-full" />
      ))}
    </div>
  );
}
