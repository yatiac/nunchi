'use client'
import { useState, useEffect } from 'react';
import { AddProductForm } from '@/components/add-product-form';
import { OpenGraphData } from '@/types/opengraph';
import ProductCard from '@/components/product-card';
import { Product } from '@/types/product';
import { getListBySlug } from '@/services/listService';
import { ProductCardsWithModal } from '@/components/product-cards-with-modal';
import { List } from '@/types/list';

// Define the interface for Open Graph data


export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product | null>(null);
  const [list, setList] = useState<List>();

  useEffect(() => {
    const fetchSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    fetchSlug();
  }, [params]);

  useEffect(() => {
    const fetchList = async () => {
      const resolvedList = await getListBySlug(slug || '');
      if (resolvedList) {
        setList(resolvedList);
      }
    }
    fetchList();
  }, [slug]);

  const handleProductAdded = (data: OpenGraphData | null) => {
    console.log(data);
    if(!data) return;
    setProductData({
      id: Math.floor(Math.random() * 1000000),
      title: data.ogTitle || '',
      description: data.ogDescription || '',
      image: data.ogImage || '',
      url: data.url || '',
      store: data.store || '',
      price: `$${data.productPrice}` || '$',
      bought: false
    });
  };

  return (
    <>
    <div className='m-4'>
      <AddProductForm onProductAdded={handleProductAdded} />
      {productData && (
        <>
        <h2> Previsualización: </h2>      
        <div className='grid gap-6 m-6 md:grid-cols-2 lg:grid-cols-3 min-h-4'>
          <ProductCard 
            key={productData.id}
            product={productData}
            onPurchase={(id: number) => console.log(`Purchased product with id: ${id}`)}
            onEdit={(id: number, updatedProduct: Partial<Product>) => console.log(updatedProduct)}
            onAddToList={(product: Partial<Product>) => console.log(product)}
            editable={true}
          />
        </div>
        </>
      )}
        </div>
        <hr className="border-b-4" />
      <div>
        { list ? (
          <>
            <h1 className="pt-4 text-4xl font-bold text-center mb-8 text-primary">{ list.name }</h1>
            <ProductCardsWithModal list={list} editable={true} />
          </>
        ) : (
          <h1 className="pt-4 text-4xl font-bold text-center mb-8 text-primary">Cargando lista...</h1>
        )}
      </div>
      </>
  )
}