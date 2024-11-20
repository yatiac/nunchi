'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Product type definition
type Product = {
  id: number
  title: string
  description: string
  store: string
  price: string
  image: string
  url: string
  bought: boolean
}

// ProductCard component
function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1/3">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="text-sm font-medium">Tienda: {product.store}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{product.price}</p>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <Button className="mt-2" size="sm">
                  Lo voy a comprar
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    title: "Smartphone X",
    description: "The latest smartphone with advanced features and long battery life.",
    store: "TechZone",
    price: "$699.99",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com/smartphone-x",
    bought: true
  },
  {
    id: 2,
    title: "Laptop Pro",
    description: "Powerful laptop for professionals with high-performance specs.",
    store: "ComputerWorld",
    price: "$1299.99",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com/laptop-pro",
    bought: false
  },
  {
    id: 3,
    title: "Wireless Earbuds",
    description: "True wireless earbuds with noise cancellation and great sound quality.",
    store: "AudioPhile",
    price: "$149.99",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com/wireless-earbuds",
    bought: false
  },
  {
    id: 4,
    title: "Patín + Casco - Talla 24 a 34",
    description: "Patín + Casco - Talla 24 a 34",
    store: "Stevens",
    price: "$18.39",
    image: "https://stevens.com.pa/media/catalog/product/1/0/1000876632_no_color_1_dkl9z4ioljpffrsw.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=265&width=265",
    url: "https://stevens.com.pa/patin-casco-talla-24-a-34-89806100007.html",
    bought: false
  }
]

export function ProductCardsComponent() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.filter(product => !product.bought).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}