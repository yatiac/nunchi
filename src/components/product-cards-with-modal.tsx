'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Product } from "@/types/product"
import { List } from "@/types/list"


// ProductCard component
function ProductCard({ product, onPurchase }: { product: Product; onPurchase: (id: number) => void }) {
  const [showModal, setShowModal] = useState(false)

  const handlePurchase = () => {
    setShowModal(true)
  }

  const confirmPurchase = () => {
    onPurchase(product.id)
    window.open(product.url, '_blank')
    setShowModal(false)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex flex-col">
          <div className="w-full h-48 relative">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold">
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                {product.title}
              </a>
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-medium">Tienda: {product.store}</p>
              <p className="text-lg font-bold">{product.price}</p>
            </div>
            <Button className="mt-4 w-full" onClick={handlePurchase}>
              Lo voy a comprar
            </Button>
          </div>
        </div>
      </Card>


      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro que quieres marcar este producto como comprado?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Al hacer click en 'Si' se removerá el producto de la lista y se abrirá una pestaña con el link para comprarlo`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPurchase}>Si</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function ProductCardsWithModal({ list }: { list: List }) {
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {availableProducts.map((product) => (
          <ProductCard key={product.id} product={product} onPurchase={handlePurchase} />
        ))}
      </div>
    </div>
  )
}