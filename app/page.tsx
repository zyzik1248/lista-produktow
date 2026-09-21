import ProductTable from "@/components/products/ProductTable";
import { getProducts } from "@/lib/api/products";

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="max-w-318 mx-auto md:px-4">
      <ProductTable products={products} />
    </main>
  );
}
