'use client'
import { useState } from "react"
import { extractMetaTags } from '@/services/extractService';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { OpenGraphData } from "@/types/opengraph";


export function AddProductForm({ onProductAdded }: { onProductAdded: (data: OpenGraphData | null) => void }) {  
  const [isLoading, setIsLoading] = useState(false)

  // const [ogData, setOgData] = useState<OpenGraphData | null>();
  const [url, setUrl] = useState('');

  const handleFetchData = async () => {  
    const data = await extractMetaTags(url);
    const ogData: OpenGraphData | null = data ? {
      ogTitle: data.title || null,
      ogImage: data.image || null,
      ogDescription: data.description || null,
      productPrice: data.price || '',
      url: data.url || null,
      store: data.store || null,
    } : null;
    // setOgData(ogData);
    console.log(ogData);
    return ogData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
     const fetchedData = await handleFetchData();
     onProductAdded(fetchedData);
      setUrl('')
      toast({
        title: "Product added successfully",
        description: "The new product has been added to the list.",
      })
    } catch (error) {
      toast({
        title: "Error adding product",
        description: "There was an error fetching the product details. Please try again.",
        variant: "destructive",
      })
      console.error('Error adding product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="product-url">Introduce URL para agregar un producto</Label>
        <Input
          id="product-url"
          type="url"
          placeholder="https://ejemplo.com/producto"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Cargar Producto'}
      </Button>
    </form>
  )
}