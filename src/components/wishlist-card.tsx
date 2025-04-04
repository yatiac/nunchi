import Link from "next/link"
import { Calendar, ChevronRight, Gift } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WishlistCardProps {
  wishlist: {
    id: string
    title: string
    description: string
    itemCount: number
    createdAt: string
    slug: string
  }
}

export function WishlistCard({ wishlist }: WishlistCardProps) {
  const formattedDate = new Date(wishlist.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{wishlist.title}</CardTitle>
        <CardDescription>{wishlist.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Gift className="mr-1 h-4 w-4" />
          <span>{wishlist.itemCount} items</span>
          <span className="mx-2">•</span>
          <Calendar className="mr-1 h-4 w-4" />
          <span>Created {formattedDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/list/${wishlist.slug}`} className="w-full">
          <Button variant="outline" className="w-full justify-between">
            View Wishlist
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

