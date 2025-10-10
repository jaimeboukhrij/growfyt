import { Card, CardContent } from '@/components/ui/card'

export function GridExercisesSkeleton () {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden h-full w-full animate-pulse"
        >
          <div className="aspect-video bg-gray-200" />
          <CardContent className="p-4 space-y-3">
            <div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded-full w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
