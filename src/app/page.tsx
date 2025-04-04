import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link"
import { WishlistCard } from "@/components/wishlist-card";
import { getLists } from "@/services/listService";
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation'

interface WishlistData {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  createdAt: string;
  slug: string;
}

export default async function Home() {
  const lists = await getLists();
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.log('El Error es:', error)
    redirect('/login')
  }
  
  // Transform the lists data to match WishlistCard props
  const wishlists: WishlistData[] = lists.map(list => ({
    id: String(list.id),
    title: list.name,
    description: `List: ${list.name}`,
    itemCount: list.products.length,
    createdAt: new Date().toISOString(),
    slug: list.slug,
  }));
  
  return (
    <main className="container max-w-md mx-auto px-4 py-6 space-y-8 pb-20">
      <Card className="border-dashed border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Crear una nueva lista</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/create-wishlist" className="w-full">
            <Button className="w-full" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Crear Lista
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Wishlists</h2>
        {wishlists.length > 0 ? (
          <div className="space-y-3">
            {wishlists.map((wishlist) => (
              <WishlistCard key={wishlist.id} wishlist={wishlist} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            You don't have any wishlists yet. Create your first one!
          </p>
        )}
      </div>
    </main>
  );
}

