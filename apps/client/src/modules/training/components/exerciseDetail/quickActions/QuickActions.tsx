import { Heart, Plus, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          Añadir a Favoritos
        </Button>
        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Añadir a Rutina
        </Button>
        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Compartir con Cliente
        </Button>
      </CardContent>
    </Card>
  )
}
