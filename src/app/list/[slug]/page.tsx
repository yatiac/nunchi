import { ProductCardsWithModal } from "@/components/product-cards-with-modal";
import { getListBySlug } from "@/services/listService";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const list = await getListBySlug(slug);
  return (
    <div>
      { list ? (
        <>
          <h1 className="pt-4 text-4xl font-bold text-center mb-8 text-primary">{ list.name }</h1>
          <ProductCardsWithModal list={list} />
        </>
      ) : (
        <h1 className="pt-4 text-4xl font-bold text-center mb-8 text-primary">List not found</h1>
      )}
    </div>
  )
}