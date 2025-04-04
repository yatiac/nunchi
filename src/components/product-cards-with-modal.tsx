'use client'

import { useState } from "react"
import { List } from "@/types/list"
import ProductCard from "@/components/product-card"

export function ProductCardsWithModal({ list, editable = false }: { list: List, editable?: boolean }) {
  const [availableProducts, setAvailableProducts] = useState(list.products)

  const handlePurchase = async (id: number) => {
    try {
        const response = await fetch(`/api/products`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, data: { bought: true } }),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const updatedProduct = await response.json();
        setAvailableProducts((prev) => prev.filter(product => product.id !== updatedProduct.product.id));
    } catch (error) {
        console.error('Error updating product as bought:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableProducts.map((product) => (
          <ProductCard 
          key={product.id}
          product={product}
          onPurchase={handlePurchase}
          deletable={editable}/>
        ))}
      </div>
    </div>
  )
}