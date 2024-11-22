'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash } from 'lucide-react'
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
import { Card } from "@/components/ui/card"
import { Product } from "@/types/product"
import { Textarea } from "@/components/ui/textarea"


// ProductCard component
export default function ProductCard({ 
  product: initialProduct, 
  onPurchase, 
  onEdit,
  onAddToList,
  editable = false,
  deletable = false }: { 
  product: Product
  onPurchase: (id: number) => void
  onEdit?: (id: number, updatedProduct: Partial<Product>) => void
  onAddToList?: (product: Partial<Product>) => void
  editable?: boolean
  deletable?: boolean
}) {
  const [product, setProduct] = useState(initialProduct)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedFields, setEditedFields] = useState({
    title: product.title,
    description: product.description,
    store: product.store,
    price: product.price,
  })

  const handlePurchase = () => {
    setShowModal(true)
  }

  const handleAddToList = () => {
    if(onAddToList) {
      onAddToList(product)
    }
  }


  const confirmPurchase = () => {
    onPurchase(product.id)
    window.open(product.url, '_blank')
    setShowModal(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    if(onEdit) {
      onEdit(product.id, editedFields)
    }
    setProduct({ ...product, ...editedFields })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedFields({
      title: product.title,
      description: product.description,
      store: product.store,
      price: product.price,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setEditedFields({ ...editedFields, [name]: value })
  }

  return (
    <>
      <Card className={`overflow-hidden ${editable ? 'border-dashed border-[3px] border-slate-400 border-opacity-50' : ''}`}>
        <div className="flex flex-col relative">
          <div className="m-4">
          { isEditing ? (<Input
                  name="title"
                  value={editedFields.title}
                  onChange={handleChange}
                  className="mb-2"
                /> ) : (
                 <h2 className="text-xl font-semibold hover:cursor-pointer">
                  <a href={`${product.url}`} target="_blank" rel="noopener noreferrer">
                    {product.title}
                  </a>
                </h2>)
}
{editable && !isEditing && <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-red-500 bg-opacity-75 hover:bg-red-500 hover:bg-opacity-100"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4 text-white" />
              <span className="text-white"> Editar </span>
              <span className="sr-only">Edit product</span>
            </Button>}
            {deletable && <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-red-500 bg-opacity-75 hover:bg-red-500 hover:bg-opacity-100 flex items-center"
              onClick={() => console.log(product.id)}
            >
              <Trash className="h-4 w-4 text-white transition-opacity duration-300" />
              <span className="text-white opacity-0 transition-opacity duration-300 hover:opacity-100"> Eliminar </span>
              <span className="sr-only">Delete product</span>
            </Button>
            }
          </div>
          <div className="w-full h-full relative round flex justify-center">
            <Image
              src={product.image}
              alt={product.title}
              style={{
                width: 'auto',
                height: 'auto',
              }}
              width={100}
              height={200}
            />
           {/* {editable && <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-red-500 bg-opacity-75 hover:bg-red-500 hover:bg-opacity-100"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4 text-white" />
              <span className="text-white"> Editar </span>
              <span className="sr-only">Edit product</span>
            </Button>}
            {deletable && <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-red-500 bg-opacity-75 hover:bg-red-500 hover:bg-opacity-100"
              onClick={() => onPurchase(product.id)}
            >
              <Trash className="h-4 w-4 text-white" />
              <span className="text-white"> Eliminar </span>
              <span className="sr-only">Delete product</span>
              </Button>
            } */}
          </div>
          <div className="p-4 flex flex-col justify-between h-full">
            {isEditing ? (
              <>
                <Textarea
                  name="description"
                  value={editedFields.description}
                  onChange={handleChange}
                  className="mb-2"
                  rows={4}
                />
                <div className="flex justify-between items-center mb-2">
                  <Input
                    name="store"
                    value={editedFields.store}
                    onChange={handleChange}
                    className="w-1/2 mr-2"
                  />
                  <Input
                    name="price"
                    value={editedFields.price}
                    onChange={handleChange}
                    className="w-1/2"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button onClick={handleCancel} variant="outline">Cancelar</Button>
                  <Button onClick={handleSave}>Guardar</Button>
                </div>
              </>
            ) : (
              <>               
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-medium">Tienda: {product.store}</p>
                  <p className="text-lg font-bold">{product.price}</p>
                </div>
              </>
            )}
            {!isEditing && (
            <div className="mt-auto">
              {editable  ? (
                <Button className="mt-4 w-full bg-gray-800 align-bottom" onClick={handleAddToList}>
                  Agregar a la lista
                </Button>
              ) : (
                <Button className="mt-4 w-full align-bottom" onClick={handlePurchase}>
                  Lo voy a comprar
                </Button>
              )}
            </div>
            )}
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