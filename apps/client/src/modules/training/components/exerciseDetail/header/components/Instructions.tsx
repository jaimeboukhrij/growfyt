import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Props {
  instructions: string[]
}

export const Instructions = ({ instructions }: Props) => {
  return (

    <Card>
      <CardHeader>
        <CardTitle>Instrucciones Paso a Paso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              {index + 1}
            </div>
            <p className="text-sm leading-relaxed pt-1">{instruction}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
