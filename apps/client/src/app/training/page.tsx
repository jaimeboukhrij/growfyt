import { redirect } from 'next/navigation'

export default function TrainingPage () {
  redirect('/training/lab')
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  )
}
