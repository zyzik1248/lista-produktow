import ProductTable from "@/components/products/table/ProductTable";
import { getProducts } from "@/lib/api/products";
import { SearchParams } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";
import { searchParamsCache } from "./searchParams";
import { notFound } from "next/navigation";
import ProductHeader from "@/components/products/ProductHeader";

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: PageProps) {
  const { page } = await searchParamsCache.parse(searchParams)
  const { products, limit, total } = await getProducts({ page })

  const totalPages = Math.ceil(total / limit)

  if (page > totalPages || page == 0) {
    notFound();
  }

  return (
    <NuqsAdapter>
      <ProductHeader/>
      <ProductTable products={products} page={page} totalPages={totalPages} />
    </NuqsAdapter>
  );
}
